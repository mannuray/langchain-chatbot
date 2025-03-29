import React, { useState } from "react";
import { useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Github, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import ExpertAdviceDialog from "./ExpertAdviceDialog";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const Header = () => {
  const [isExpertAdviceDialogOpen, setIsExpertAdviceDialogOpen] = useState(false);
  const [messageIdForAdvice, setMessageIdForAdvice] = useState<string | null>(null);

  const handleExpertAdviceClick = (messageId: string) => {
    setMessageIdForAdvice(messageId);
    setIsExpertAdviceDialogOpen(true);
  };

  const closeExpertAdviceDialog = () => {
    setIsExpertAdviceDialogOpen(false);
    setMessageIdForAdvice(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          AI Chatbot
        </div>
        
        <div className="flex items-center gap-2">
          <Link 
            to="/settings" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-3"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
