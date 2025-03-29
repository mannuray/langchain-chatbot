
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react";
import ExpertAdviceDialog from "./ExpertAdviceDialog";
import { useToast } from "@/hooks/use-toast";

interface MessageBubbleProps {
  message: Message;
  onFeedbackSubmit?: (messageId: string, feedback: "positive" | "negative") => void;
  onExpertAdviceRequest?: (messageId: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  onFeedbackSubmit,
  onExpertAdviceRequest
}) => {
  const isUser = message.role === "user";
  const [showSources, setShowSources] = useState(false);
  const [showExpertDialog, setShowExpertDialog] = useState(false);
  const { toast } = useToast();
  
  const handleFeedback = (feedback: "positive" | "negative") => {
    if (message.feedback === feedback) return;
    
    if (onFeedbackSubmit) {
      onFeedbackSubmit(message.id, feedback);
    }
    
    // If no handler provided, we'll still update the UI
    message.feedback = feedback;
    
    toast({
      title: feedback === "positive" ? "Thank you for your feedback!" : "We're sorry about that",
      description: feedback === "positive" 
        ? "We're glad the response was helpful." 
        : "You can request expert advice for more information.",
    });
  };
  
  return (
    <div
      className={cn(
        "group flex w-full items-start gap-x-4 py-4",
        isUser ? "justify-end" : "justify-start",
        "animate-fade-in-up"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 rounded-full bg-primary p-1.5 text-white shadow-subtle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M17 18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12Z" />
            <path d="M11 6h2" />
            <path d="M12 14v4" />
            <rect x="9" y="10" width="6" height="2" rx="1" />
          </svg>
        </div>
      )}

      <div
        className={cn(
          "relative max-w-[80%] rounded-2xl px-4 py-3 shadow-glass-soft",
          isUser
            ? "rounded-tr-sm bg-chat-user"
            : "rounded-tl-sm bg-chat-assistant",
          "transition-all duration-200 ease-in-out hover:shadow-subtle-hover",
        )}
      >
        <div className="prose prose-sm dark:prose-invert">
          <p>{message.content}</p>
          
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setShowSources(!showSources)}
                className="text-xs text-primary font-medium flex items-center gap-1"
              >
                {showSources ? 'Hide sources' : 'Show sources'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-3 w-3 transition-transform ${showSources ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              {showSources && (
                <div className="mt-2 space-y-2 text-xs bg-muted/30 p-2 rounded-lg">
                  <h4 className="font-semibold text-xs">Sources:</h4>
                  {message.sources.map((source, index) => (
                    <div key={index} className="border-l-2 border-primary/30 pl-2 py-1">
                      <p className="text-muted-foreground mb-1">{source.content}</p>
                      <p className="text-xs font-medium">{source.source}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {message.timeTaken && (
            <div className="mt-2 text-xs text-muted-foreground">
              Response time: {message.timeTaken}
            </div>
          )}
          
          {/* Feedback section for assistant messages */}
          {!isUser && (
            <div className="mt-4 pt-3 border-t border-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Was this helpful?</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "p-1 h-auto",
                    message.feedback === "positive" && "bg-green-100 text-green-700"
                  )}
                  onClick={() => handleFeedback("positive")}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "p-1 h-auto",
                    message.feedback === "negative" && "bg-red-100 text-red-700"
                  )}
                  onClick={() => handleFeedback("negative")}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
              
              {(message.feedback === "negative" || message.expertAdviceRequested) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setShowExpertDialog(true)}
                  disabled={message.expertAdviceRequested}
                >
                  <HelpCircle className="h-3 w-3 mr-1" />
                  {message.expertAdviceRequested 
                    ? "Expert advice requested" 
                    : "Request expert advice"}
                </Button>
              )}
            </div>
          )}
        </div>
        
        <span
          className={cn(
            "absolute bottom-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100",
            isUser ? "right-4" : "left-4"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {isUser && (
        <div className="flex-shrink-0 rounded-full bg-secondary p-1.5 text-secondary-foreground shadow-subtle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
      
      {/* Expert advice dialog */}
      <ExpertAdviceDialog 
        isOpen={showExpertDialog} 
        onClose={() => setShowExpertDialog(false)}
        messageId={message.id}
      />
    </div>
  );
};

export default MessageBubble;
