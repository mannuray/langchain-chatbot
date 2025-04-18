
export type MessageRole = "user" | "assistant" | "system";

export interface Source {
  content: string;
  source: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  sources?: Source[];
  timeTaken?: string;
  feedback?: "positive" | "negative";
  expertAdviceRequested?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
