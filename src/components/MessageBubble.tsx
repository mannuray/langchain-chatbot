
import React from "react";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";
  
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
        <p className="prose prose-sm dark:prose-invert">
          {message.content}
        </p>
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
    </div>
  );
};

export default MessageBubble;
