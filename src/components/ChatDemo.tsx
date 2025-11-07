import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, FileText } from "lucide-react";
import { useState } from "react";

const sampleMessages = [
  {
    role: "user",
    content: "How does our deployment pipeline work?",
  },
  {
    role: "assistant",
    content: "Based on your team's documentation, here's how your deployment pipeline works:\n\n1. **Code Review**: PRs require 2 approvals\n2. **CI Checks**: Jest tests + ESLint on every commit\n3. **Staging Deploy**: Automatic merge to staging branch\n4. **Production**: Manual approval via JIRA ticket\n\nSources: deployment-guide.md, JIRA-1247",
    sources: ["deployment-guide.md", "JIRA-1247"],
  },
];

export const ChatDemo = () => {
  const [input, setInput] = useState("");

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ask Anything About Your Codebase
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how OnboardIQ answers company-specific questions using your actual documentation
          </p>
        </div>

        <Card className="max-w-3xl mx-auto bg-card border-border/50 shadow-[var(--shadow-medium)]">
          {/* Chat messages */}
          <div className="p-6 space-y-6 min-h-[400px] max-h-[500px] overflow-y-auto">
            {sampleMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  {message.sources && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/20">
                      {message.sources.map((source, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 text-xs px-2 py-1 bg-background/10 rounded-md"
                        >
                          <FileText className="w-3 h-3" />
                          <span>{source}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about your team's processes, tools, or codebase..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-background"
              />
              <Button 
                size="icon"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
