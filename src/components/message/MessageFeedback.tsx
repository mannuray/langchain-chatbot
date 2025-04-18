
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react";

interface MessageFeedbackProps {
  feedback?: "positive" | "negative";
  expertAdviceRequested?: boolean;
  onFeedback: (feedback: "positive" | "negative") => void;
  onExpertAdvice: () => void;
}

export const MessageFeedback = ({ 
  feedback, 
  expertAdviceRequested, 
  onFeedback, 
  onExpertAdvice 
}: MessageFeedbackProps) => {
  return (
    <div className="mt-4 pt-3 border-t border-muted/30 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Was this helpful?</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "p-1 h-auto",
            feedback === "positive" && "bg-green-100 text-green-700"
          )}
          onClick={() => onFeedback("positive")}
        >
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "p-1 h-auto",
            feedback === "negative" && "bg-red-100 text-red-700"
          )}
          onClick={() => onFeedback("negative")}
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
      </div>
      
      {(feedback === "negative" || expertAdviceRequested) && (
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={onExpertAdvice}
          disabled={expertAdviceRequested}
        >
          <HelpCircle className="h-3 w-3 mr-1" />
          {expertAdviceRequested 
            ? "Expert advice requested" 
            : "Request expert advice"}
        </Button>
      )}
    </div>
  );
};
