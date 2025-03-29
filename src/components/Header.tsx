
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = ({ title, subtitle }: { title?: string; subtitle?: string }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          {title || "AI Chatbot"}
          {subtitle && (
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
