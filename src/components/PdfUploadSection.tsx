
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface PdfUploadSectionProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setPdfContext: React.Dispatch<React.SetStateAction<string>>;
  pdfContext: string;
}

const PdfUploadSection = ({ setMessages, setPdfContext, pdfContext }: PdfUploadSectionProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      // Convert PDF to text using a simple approach
      // For production, you might want to use a more robust PDF parsing library
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Simple text extraction - this is a basic implementation
      // In a real application, you'd use a proper PDF parsing library
      let text = '';
      for (let i = 0; i < uint8Array.length; i++) {
        const byte = uint8Array[i];
        if (byte >= 32 && byte <= 126) {
          text += String.fromCharCode(byte);
        } else if (byte === 10 || byte === 13) {
          text += ' ';
        }
      }
      
      // Clean up the extracted text
      text = text.replace(/\s+/g, ' ').trim();
      
      // If the text is too short, it might not have been extracted properly
      if (text.length < 50) {
        throw new Error('Could not extract readable text from PDF');
      }
      
      return text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF. Please try a different PDF file.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setIsProcessing(true);
      try {
        const extractedText = await extractTextFromPDF(file);
        
        setUploadedFile(file);
        setPdfContext(extractedText);
        
        toast({
          title: "PDF Processed Successfully",
          description: `${file.name} has been analyzed and is ready for questions.`,
        });
        
        // Add a message about the upload
        const uploadMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          content: `Perfect! I've successfully processed your PDF "${file.name}" and extracted its content. I can now answer questions about the document, provide summaries, or analyze specific sections. What would you like to know about the document?`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, uploadMessage]);
        
      } catch (error) {
        console.error('PDF processing error:', error);
        toast({
          title: "PDF Processing Failed",
          description: error instanceof Error ? error.message : "Could not process the PDF file.",
          variant: "destructive"
        });
      } finally {
        setIsProcessing(false);
      }
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
    }
  };

  const handleRemovePdf = () => {
    setUploadedFile(null);
    setPdfContext('');
    toast({
      title: "PDF Removed",
      description: "The PDF has been removed from the analysis context.",
    });
    
    const removeMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: "The PDF has been removed. I'm back to analyzing gaming data only. Feel free to upload another PDF or ask about gaming trends!",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, removeMessage]);
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
          {!uploadedFile ? (
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
                disabled={isProcessing}
              />
              <label htmlFor="pdf-upload">
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-700" 
                  asChild
                  disabled={isProcessing}
                >
                  <span className="cursor-pointer">
                    {isProcessing ? 'Processing...' : 'Choose File'}
                  </span>
                </Button>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center">
                <File className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-300 text-sm truncate">{uploadedFile.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemovePdf}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          {pdfContext && (
            <div className="text-xs text-slate-400 bg-slate-700/50 p-2 rounded">
              PDF loaded: {Math.round(pdfContext.length / 1000)}k characters extracted
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PdfUploadSection;
