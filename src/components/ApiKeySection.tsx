
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ApiKeySectionProps {
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ApiKeySection = ({ apiKey, setApiKey, setMessages }: ApiKeySectionProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      toast({
        title: "API Key Set",
        description: "ChatGPT connection established successfully!",
      });
      
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: "Great! I'm now connected to ChatGPT and ready to provide detailed gaming analysis. What would you like to explore about the gaming data?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, welcomeMessage]);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Key className="w-5 h-5 mr-2 text-yellow-400" />
          ChatGPT Connection
        </CardTitle>
        <CardDescription className="text-slate-400">
          Enter your OpenAI API key to connect
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Input
              type={showApiKey ? "text" : "password"}
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-slate-400 hover:text-white"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Button 
            onClick={handleApiKeySubmit}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
            disabled={!apiKey.trim()}
          >
            Connect to ChatGPT
          </Button>
          {apiKey && (
            <div className="flex items-center p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
              <Key className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-green-300 text-sm">API Key Set</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeySection;
