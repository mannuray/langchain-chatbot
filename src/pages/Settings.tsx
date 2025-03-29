
import React, { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Save } from "lucide-react";

const settingsSchema = z.object({
  apiUrl: z.string().url({ message: "Please enter a valid URL" }),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const Settings = () => {
  const { apiUrl, setApiUrl } = useSettings();
  const { toast } = useToast();
  
  // Initialize the form with the current API URL
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      apiUrl: apiUrl,
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    setApiUrl(data.apiUrl);
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully saved.",
    });
  };

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Chat
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Configure your application settings
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="apiUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expert Advice API URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://api.example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      The URL where expert advice requests will be sent
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" /> 
                Save Settings
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
