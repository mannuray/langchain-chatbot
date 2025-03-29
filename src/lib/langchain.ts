
import { Message } from "../types/chat";

interface ApiResponse {
  answer: string;
  question: string;
  sources?: {
    content: string;
    source: string;
  }[];
  time_taken?: string;
}

// Function to query your API endpoint
export async function queryLangChainModel(messages: Message[]): Promise<Message> {
  // Get the last user message
  const lastMessage = messages.filter(msg => msg.role === "user").pop();
  
  if (!lastMessage) {
    throw new Error("No user message found");
  }
  
  try {
    console.log("Sending query to API:", lastMessage.content);
    
    // Make a request to your API endpoint
    const response = await fetch('http://localhost:5001/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: lastMessage.content
      }),
      // Add cache: 'no-store' to prevent caching which could cause refresh issues
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.error("API response not OK:", response.status, response.statusText);
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    console.log("API response received:", data);
    
    // Return the response in the format expected by the chat interface
    return {
      id: "", // This will be assigned by the chat interface
      role: "assistant",
      content: data.answer,
      timestamp: new Date(),
      sources: data.sources,
      timeTaken: data.time_taken
    };
  } catch (error) {
    console.error("Error querying API:", error);
    throw error;
  }
}
