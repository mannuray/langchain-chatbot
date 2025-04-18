
import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

// Define component prop types to include className
type ComponentWithClassName = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <ReactMarkdown
      className="whitespace-pre-wrap break-words"
      components={{
        pre: ({ node, ...props }: ComponentWithClassName) => (
          <div className="overflow-auto rounded-md bg-secondary/50 p-2 my-2">
            <pre {...props} />
          </div>
        ),
        code: ({ node, className, ...props }: ComponentWithClassName) => (
          className?.includes('language-') 
            ? <code className="text-sm bg-secondary/50 block overflow-x-auto p-2" {...props} />
            : <code className="rounded bg-muted px-1 py-0.5 text-sm font-medium" {...props} />
        ),
        ul: ({ node, ...props }: ComponentWithClassName) => <ul className="list-disc pl-6 my-2" {...props} />,
        ol: ({ node, ...props }: ComponentWithClassName) => <ol className="list-decimal pl-6 my-2" {...props} />,
        li: ({ node, ...props }: ComponentWithClassName) => <li className="my-1" {...props} />,
        h1: ({ node, ...props }: ComponentWithClassName) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
        h2: ({ node, ...props }: ComponentWithClassName) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />,
        h3: ({ node, ...props }: ComponentWithClassName) => <h3 className="text-md font-bold mt-3 mb-1" {...props} />,
        p: ({ node, ...props }: ComponentWithClassName) => <p className="my-2" {...props} />,
        a: ({ node, ...props }: ComponentWithClassName) => <a className="text-primary underline" {...props} />,
        blockquote: ({ node, ...props }: ComponentWithClassName) => (
          <blockquote className="border-l-4 border-muted pl-4 italic my-2" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
