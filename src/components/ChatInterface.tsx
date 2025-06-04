
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, Bot, User } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  apiKey: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatInterface = ({ messages, setMessages, apiKey, isLoading, setIsLoading }: ChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState('');

  const callOpenAI = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      return "Please enter your OpenAI API key first to connect with ChatGPT.";
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are a Gaming AI Analyst expert. You have access to gaming data showing:
              
              Top PC Games Data:
              1. Counter-Strike 2: 1,247 hours average playtime, 95/100 rating, 1.5M players, FPS genre
              2. Dota 2: 1,156 hours average playtime, 92/100 rating, 850K players, Strategy genre  
              3. Baldur's Gate 3: 743 hours average playtime, 96/100 rating, 650K players, RPG genre
              4. Team Fortress 2: 892 hours average playtime, 89/100 rating, 420K players, FPS genre
              5. Warframe: 567 hours average playtime, 87/100 rating, 380K players, FPS genre
              6. Terraria: 445 hours average playtime, 94/100 rating, 320K players, Indie genre
              
              Genre Distribution: FPS (35%), RPG (28%), Strategy (18%), Indie (12%), Other (7%)
              
              Provide detailed, insightful analysis about gaming trends, game comparisons, and recommendations. Be enthusiastic about gaming while providing data-driven insights.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from ChatGPT');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return `Error connecting to ChatGPT: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key and try again.`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const botResponse = await callOpenAI(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 h-[700px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Bot className="w-5 h-5 mr-2 text-purple-400" />
          AI Gaming Analyst
          {apiKey && <Badge className="ml-2 bg-green-600">ChatGPT Connected</Badge>}
        </CardTitle>
        <CardDescription className="text-slate-400">
          Ask questions about gaming data and uploaded documents
        </CardDescription>
      </CardHeader>
      
      <Separator className="bg-slate-600" />
      
      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-purple-600' 
                  : 'bg-slate-700'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-purple-400" />
                )}
              </div>
              <div className={`rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-slate-100'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-purple-200' : 'text-slate-400'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-700">
                <Bot className="w-4 h-4 text-purple-400" />
              </div>
              <div className="bg-slate-700 text-slate-100 rounded-lg p-3">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <Separator className="bg-slate-600" />
      
      {/* Input */}
      <div className="p-4">
        <div className="flex space-x-2">
          <Textarea
            placeholder="Ask about gaming data, trends, or your uploaded PDF..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400 resize-none"
            rows={1}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            disabled={!inputMessage.trim() || isLoading}
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
