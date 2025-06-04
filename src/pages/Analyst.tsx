
import { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ChatInterface from '@/components/ChatInterface';
import ApiKeySection from '@/components/ApiKeySection';
import PdfUploadSection from '@/components/PdfUploadSection';
import SampleQuestions from '@/components/SampleQuestions';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const Analyst = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your Gaming AI Analyst powered by ChatGPT. Please enter your OpenAI API key to get started, then I can help you understand gaming data, trends, and analyze any PDF documents you upload.",
      timestamp: new Date()
    }
  ]);
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSampleQuestion = (question: string) => {
    // This will be handled by the ChatInterface component
    // We can pass this down or handle it here and update the input
    console.log('Sample question selected:', question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                GameAnalyst AI
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  Home
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <ApiKeySection
              apiKey={apiKey}
              setApiKey={setApiKey}
              setMessages={setMessages}
            />

            <PdfUploadSection setMessages={setMessages} />

            <SampleQuestions onQuestionSelect={handleSampleQuestion} />
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <ChatInterface
              messages={messages}
              setMessages={setMessages}
              apiKey={apiKey}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyst;
