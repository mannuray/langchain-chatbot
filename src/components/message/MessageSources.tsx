
import React, { useState } from "react";
import { Source } from "@/types/chat";

interface MessageSourcesProps {
  sources: Source[];
}

export const MessageSources = ({ sources }: MessageSourcesProps) => {
  const [showSources, setShowSources] = useState(false);

  if (!sources || sources.length === 0) return null;

  return (
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
          {sources.map((source, index) => (
            <div key={index} className="border-l-2 border-primary/30 pl-2 py-1">
              <p className="text-muted-foreground mb-1">{source.content}</p>
              <p className="text-xs font-medium">{source.source}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
