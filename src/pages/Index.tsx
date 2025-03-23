
import React from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-10">
      <Header 
        title="LangChain Chat Assistant" 
        subtitle="Ask questions and get answers from your AI model through LangChain"
      />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="relative h-[calc(100vh-250px)] min-h-[500px]">
              <div className="absolute inset-0">
                <ChatInterface />
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
            <p className="text-sm text-muted-foreground">
              This demo connects to a simulated LangChain model.
              <br />
              In a production environment, you would connect to your actual LangChain setup.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
