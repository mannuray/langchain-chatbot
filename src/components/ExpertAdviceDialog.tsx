
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import settings from "@/settings";

interface ExpertAdviceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  messageId: string;
}

const ExpertAdviceDialog: React.FC<ExpertAdviceDialogProps> = ({ isOpen, onClose, messageId }) => {
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const apiUrl = settings.apiUrl;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Make a real API call to the expert advice endpoint
      const response = await fetch(`${apiUrl}/ask-expert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: details,
          messageId: messageId
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Expert advice response:", data);
      
      toast({
        title: "Expert advice requested",
        description: "An expert will review your question and provide additional information soon.",
      });
      
      onClose();
    } catch (error) {
      console.error("Error requesting expert advice:", error);
      
      toast({
        title: "Error",
        description: `Failed to request expert advice. Please ensure the API server is running at ${apiUrl}.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Expert Advice</DialogTitle>
          <DialogDescription>
            Explain why you need expert advice and what aspects of the answer you'd like more information about.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Textarea
            placeholder="Please provide more details about your question..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!details.trim() || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExpertAdviceDialog;
