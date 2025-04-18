import React from "react";
import ReactMarkdown from "react-markdown";
import { type Components } from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  // Define properly typed components object for ReactMarkdown
  const components: Components = {
    pre: ({ children, ...props }) => (
      <div className="overflow-auto rounded-md bg-secondary/50 p-2 my-2">
        <pre {...props}>{children}</pre>
      </div>
    ),
    code: ({ children, className, ...props }) => (
      className?.includes('language-') 
        ? <code className="text-sm bg-secondary/50 block overflow-x-auto p-2" {...props}>{children}</code>
        : <code className="rounded bg-muted px-1 py-0.5 text-sm font-medium" {...props}>{children}</code>
    ),
    ul: ({ children, ...props }) => <ul className="list-disc pl-6 my-2" {...props}>{children}</ul>,
    ol: ({ children, ...props }) => <ol className="list-decimal pl-6 my-2" {...props}>{children}</ol>,
    li: ({ children, ...props }) => <li className="my-1 leading-tight" {...props}>{children}</li>,
    h1: ({ children, ...props }) => <h1 className="text-xl font-bold mt-4 mb-2" {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 className="text-lg font-bold mt-3 mb-2" {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 className="text-md font-bold mt-3 mb-1" {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p className="my-2" {...props}>{children}</p>,
    a: ({ children, ...props }) => <a className="text-primary underline" {...props}>{children}</a>,
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-muted pl-4 italic my-2" {...props}>{children}</blockquote>
    ),
  };

  return (
    <ReactMarkdown
      className="whitespace-pre-wrap break-words"
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
};
