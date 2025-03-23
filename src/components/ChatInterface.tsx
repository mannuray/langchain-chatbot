
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Message, ChatState } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { queryLangChainModel } from "@/lib/langchain";

const ChatInterface: React.FC = () => {
  const { toast } = useToast();
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: uuidv4(),
        role: "assistant",
        content: "Hello! I'm your LangChain AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ],
    isLoading: false,
    error: null,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatState.messages]);

  const handleSendMessage = async (content: string) => {
    if (chatState.isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      // Get response from LangChain
      const response = await queryLangChainModel([
        ...chatState.messages,
        userMessage,
      ]);

      // Add assistant response
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error querying LangChain model:", error);
      
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to get a response. Please try again.",
      }));

      toast({
        title: "Error",
        description: "Failed to get a response from the AI model. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-glass">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 fade-mask">
        <div className="space-y-1">
          {chatState.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {chatState.isLoading && (
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
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t bg-card/50 p-4">
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={chatState.isLoading}
          placeholder="Ask your LangChain AI assistant..."
        />
      </div>
    </div>
  );
};

export default ChatInterface;
