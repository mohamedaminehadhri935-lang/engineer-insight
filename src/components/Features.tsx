import { Database, MessageSquare, Map, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Database,
    title: "Smart Data Ingestion",
    description: "Automatically connects to Confluence, GitHub, JIRA, and Notion. Your docs become searchable knowledge instantly.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: MessageSquare,
    title: "RAG-Powered Chat",
    description: "Ask questions like 'How does our CI/CD work?' and get accurate answers with source citations from your actual docs.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: Map,
    title: "Personalized Learning Paths",
    description: "AI analyzes JIRA history to build 30-day onboarding maps tailored to each engineer's role and learning pace.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Your data never leaves your infrastructure. SOC 2 compliant with end-to-end encryption and SSO support.",
    gradient: "from-primary via-secondary to-primary",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Everything You Need to Onboard Smarter
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built by engineers, for engineers. OnboardIQ turns tribal knowledge into structured learning.
          </p>
        </div>
        
        {/* Feature grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-gradient-to-br from-card to-card/50 border-border/50 backdrop-blur-sm hover:shadow-[var(--shadow-medium)] transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 mb-5 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
