
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, Bot, User, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  pdfContext?: string;
}

const ChatInterface = ({ messages, setMessages, apiKey, isLoading, setIsLoading, pdfContext }: ChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState('');

  const callChatGPTEdgeFunction = async (userMessage: string, messageHistory: Message[]): Promise<string> => {
    try {
      console.log('Calling ChatGPT edge function...');
      
      const { data, error } = await supabase.functions.invoke('chat-gpt', {
        body: {
          message: userMessage,
          messages: messageHistory.slice(-10), // Send last 10 messages for context
          pdfContext: pdfContext // Include PDF context if available
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to get response from ChatGPT');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      return data?.response || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('ChatGPT Edge Function Error:', error);
      return `Error connecting to ChatGPT: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`;
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
      const botResponse = await callChatGPTEdgeFunction(inputMessage, messages);
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
          <Badge className="ml-2 bg-green-600">ChatGPT Connected</Badge>
          {pdfContext && (
            <Badge className="ml-2 bg-blue-600 flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              PDF Loaded
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-slate-400">
          Ask questions about gaming data{pdfContext ? ', your uploaded PDF,' : ''} and get detailed analysis
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
            placeholder={`Ask about gaming data, trends${pdfContext ? ', or your uploaded PDF' : ''}...`}
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
