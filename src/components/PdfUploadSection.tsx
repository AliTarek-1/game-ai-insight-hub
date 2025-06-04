
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface PdfUploadSectionProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const PdfUploadSection = ({ setMessages }: PdfUploadSectionProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

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

  return (
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
  );
};

export default PdfUploadSection;
