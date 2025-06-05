
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, messages, pdfContext } = await req.json();

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    console.log('OpenAI API key status:', openAIApiKey ? 'Present' : 'Missing');
    console.log('PDF context status:', pdfContext ? `Present (${pdfContext.length} characters)` : 'Not provided');

    // Prepare the system message with gaming data and PDF context
    let systemContent = `You are a Gaming AI Analyst expert. You have access to gaming data showing:
        
        Top PC Games Data:
        1. Counter-Strike 2: 1,247 hours average playtime, 95/100 rating, 1.5M players, FPS genre
        2. Dota 2: 1,156 hours average playtime, 92/100 rating, 850K players, Strategy genre  
        3. Baldur's Gate 3: 743 hours average playtime, 96/100 rating, 650K players, RPG genre
        4. Team Fortress 2: 892 hours average playtime, 89/100 rating, 420K players, FPS genre
        5. Warframe: 567 hours average playtime, 87/100 rating, 380K players, FPS genre
        6. Terraria: 445 hours average playtime, 94/100 rating, 320K players, Indie genre
        
        Genre Distribution: FPS (35%), RPG (28%), Strategy (18%), Indie (12%), Other (7%)
        
        Provide detailed, insightful analysis about gaming trends, game comparisons, and recommendations. Be enthusiastic about gaming while providing data-driven insights.`;

    // Add PDF context if available
    if (pdfContext && pdfContext.trim()) {
      systemContent += `\n\nAdditionally, the user has uploaded a PDF document with the following content that you should reference when answering questions about the document:\n\n${pdfContext.substring(0, 8000)}`; // Limit to prevent token overflow
    }

    // Prepare the messages array for OpenAI
    const openAIMessages = [
      {
        role: 'system',
        content: systemContent
      }
    ];

    // Add previous messages if provided
    if (messages && messages.length > 0) {
      messages.forEach((msg: any) => {
        if (msg.type === 'user') {
          openAIMessages.push({ role: 'user', content: msg.content });
        } else if (msg.type === 'bot') {
          openAIMessages.push({ role: 'assistant', content: msg.content });
        }
      });
    }

    // Add the current message
    openAIMessages.push({ role: 'user', content: message });

    console.log('Calling OpenAI API with messages:', openAIMessages.length);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openAIMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to get response from ChatGPT');
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    console.log('Successfully generated AI response');

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-gpt function:', error);
    return new Response(
      JSON.stringify({ 
        error: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
