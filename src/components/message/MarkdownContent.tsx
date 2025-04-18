
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
    li: ({ children, ...props }) => <li className="my-0.5 leading-normal" {...props}>{children}</li>,
    h1: ({ children, ...props }) => <h1 className="text-xl font-bold mt-4 mb-2" {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 className="text-lg font-bold mt-3 mb-2" {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 className="text-md font-bold mt-3 mb-1" {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p className="my-2 leading-relaxed" {...props}>{children}</p>,
    a: ({ children, ...props }) => <a className="text-primary underline hover:text-primary/80 transition-colors" {...props}>{children}</a>,
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-muted pl-4 italic my-2" {...props}>{children}</blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-border" {...props}>{children}</table>
      </div>
    ),
    thead: ({ children, ...props }) => <thead className="bg-muted/50" {...props}>{children}</thead>,
    tbody: ({ children, ...props }) => <tbody className="divide-y divide-border" {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
    th: ({ children, ...props }) => <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider" {...props}>{children}</th>,
    td: ({ children, ...props }) => <td className="px-3 py-2 text-sm" {...props}>{children}</td>,
  };

  return (
    <ReactMarkdown
      className="prose prose-sm max-w-none dark:prose-invert break-words"
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
};
