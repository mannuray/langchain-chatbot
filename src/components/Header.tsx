
import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="relative py-6 animate-fade-in">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/80 to-transparent opacity-40" />
      
      <div className="container flex flex-col items-center justify-center text-center">
        <div className="relative mb-2">
          <span className="chip inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            LangChain AI
          </span>
        </div>
        
        <h1 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        
        {subtitle && (
          <p className="mt-2 max-w-xl text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
