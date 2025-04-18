
import React from "react";

export const LoadingIndicator = () => {
  return (
    <div className="flex items-start gap-x-4 animate-fade-in-up py-4">
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
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-chat-assistant px-4 py-3 shadow-glass-soft">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce-subtle" style={{ animationDelay: "0ms" }}></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce-subtle" style={{ animationDelay: "150ms" }}></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce-subtle" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
};
