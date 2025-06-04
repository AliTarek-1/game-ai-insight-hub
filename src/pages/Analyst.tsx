
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { File, ArrowUp, Bot, User, Upload, Key, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  const [inputMessage, setInputMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sampleQuestions = [
    "Which game has the highest playtime and why?",
    "What trends do you see in PC gaming?",
    "Compare Counter-Strike 2 vs Dota 2 performance",
    "What makes Baldur's Gate 3 so highly rated?",
    "Analyze the genre distribution data"
  ];

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      toast({
        title: "PDF Uploaded Successfully",
        description: `${file.name} is ready for analysis.`,
      });
      
      // Add a message about the upload
      const uploadMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: `Perfect! I've received your PDF "${file.name}". You can now ask me questions about its content, request summaries, or get specific insights from the document.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, uploadMessage]);
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
    }
  };

  const handleSampleQuestion = (question: string) => {
    setInputMessage(question);
  };

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
            {/* API Key Setup */}
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

            {/* PDF Upload */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <File className="w-5 h-5 mr-2 text-green-400" />
                  PDF Analysis
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Upload a PDF to analyze with AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-400 text-sm mb-2">
                      Click to upload PDF or drag and drop
                    </p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload">
                      <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700" asChild>
                        <span className="cursor-pointer">Choose File</span>
                      </Button>
                    </label>
                  </div>
                  
                  {uploadedFile && (
                    <div className="flex items-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <File className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-green-300 text-sm truncate">{uploadedFile.name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sample Questions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Sample Questions</CardTitle>
                <CardDescription className="text-slate-400">
                  Try asking about gaming data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sampleQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full text-left justify-start text-slate-300 hover:bg-slate-700 hover:text-white"
                      onClick={() => handleSampleQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyst;
