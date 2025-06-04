
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { File, ArrowUp, Bot, User, Upload } from "lucide-react";
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
      content: "Hello! I'm your Gaming AI Analyst. I can help you understand gaming data, trends, and analyze any PDF documents you upload. What would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const sampleQuestions = [
    "Which game has the highest playtime and why?",
    "What trends do you see in PC gaming?",
    "Compare Counter-Strike 2 vs Dota 2 performance",
    "What makes Baldur's Gate 3 so highly rated?",
    "Analyze the genre distribution data"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('counter-strike') || lowerQuestion.includes('csgo')) {
      return "Counter-Strike 2 leads with 1,247 hours average playtime and a 95/100 rating. Its success comes from competitive gameplay, regular updates, and a massive esports scene. The game has 1.5M active players, making it the most popular FPS on PC.";
    }
    
    if (lowerQuestion.includes('baldur') || lowerQuestion.includes('gate')) {
      return "Baldur's Gate 3 has the highest rating at 96/100 despite 'only' 743 hours average playtime. Its success is due to exceptional storytelling, turn-based combat, and unprecedented player choice freedom. It represents the gold standard for modern RPGs.";
    }
    
    if (lowerQuestion.includes('trend') || lowerQuestion.includes('gaming')) {
      return "Key PC gaming trends: 1) FPS games dominate (35% market share), 2) RPGs are growing rapidly (28%), 3) Competitive multiplayer games have longest retention, 4) Story-driven single-player games achieve highest ratings, 5) Indie games are gaining significant traction (12% share).";
    }
    
    if (lowerQuestion.includes('genre') || lowerQuestion.includes('distribution')) {
      return "Genre analysis shows FPS games lead at 35%, followed by RPGs at 28%. Strategy games hold 18%, while Indie games are surprisingly strong at 12%. This distribution reflects player preference for competitive gameplay and immersive storytelling.";
    }
    
    if (lowerQuestion.includes('compare') || lowerQuestion.includes('vs')) {
      return "Counter-Strike 2 vs Dota 2 comparison: CS2 has higher playtime (1,247h vs 1,156h) and more players (1.5M vs 850K), but similar ratings (95 vs 92). CS2's accessibility gives it broader appeal, while Dota 2 maintains a dedicated hardcore audience. Both show upward trends.";
    }
    
    return `Based on the gaming data analysis, here are key insights about "${question}": The data shows strong performance metrics across all major titles, with FPS and RPG games leading player engagement. Counter-Strike 2 and Baldur's Gate 3 represent excellent examples of their respective genres' success factors.`;
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
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-purple-200' : 'text-slate-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                    disabled={!inputMessage.trim()}
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
