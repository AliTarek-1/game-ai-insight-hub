
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SampleQuestionsProps {
  onQuestionSelect: (question: string) => void;
}

const SampleQuestions = ({ onQuestionSelect }: SampleQuestionsProps) => {
  const sampleQuestions = [
    "Which game has the highest playtime and why?",
    "What trends do you see in PC gaming?",
    "Compare Counter-Strike 2 vs Dota 2 performance",
    "What makes Baldur's Gate 3 so highly rated?",
    "Analyze the genre distribution data"
  ];

  return (
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
              onClick={() => onQuestionSelect(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleQuestions;
