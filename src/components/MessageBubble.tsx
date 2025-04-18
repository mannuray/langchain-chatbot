
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { useToast } from "@/hooks/use-toast";
import ExpertAdviceDialog from "./ExpertAdviceDialog";
import { LoadingIndicator } from "./message/LoadingIndicator";
import { MessageSources } from "./message/MessageSources";
import { MessageFeedback } from "./message/MessageFeedback";
import { MarkdownContent } from "./message/MarkdownContent";

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
          "relative max-w-[85%] rounded-2xl px-4 py-3 shadow-glass-soft",
          isUser
            ? "rounded-tr-sm bg-chat-user text-foreground"
            : "rounded-tl-sm bg-chat-assistant text-foreground",
          "transition-all duration-200 ease-in-out hover:shadow-subtle-hover",
        )}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{message.content}</div>
        ) : (
          <div className="markdown-content overflow-hidden">
            <MarkdownContent content={message.content} />
          </div>
        )}
        
        <MessageSources sources={message.sources || []} />
        
        {message.timeTaken && (
          <div className="mt-2 text-xs text-muted-foreground">
            Response time: {message.timeTaken}
          </div>
        )}
        
        {!isUser && (
          <MessageFeedback 
            feedback={message.feedback}
            expertAdviceRequested={message.expertAdviceRequested}
            onFeedback={handleFeedback}
            onExpertAdvice={() => setShowExpertDialog(true)}
          />
        )}
        
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
      
      <ExpertAdviceDialog 
        isOpen={showExpertDialog} 
        onClose={() => setShowExpertDialog(false)}
        messageId={message.id}
      />
    </div>
  );
};

export default MessageBubble;
