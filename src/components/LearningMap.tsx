import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const learningPhases = [
  {
    phase: "Week 1: Foundation",
    status: "completed",
    modules: [
      { title: "Setup Dev Environment", completed: true },
      { title: "Architecture Overview", completed: true },
      { title: "Code Review Process", completed: true },
    ],
  },
  {
    phase: "Week 2: Core Systems",
    status: "current",
    modules: [
      { title: "API Design Patterns", completed: true },
      { title: "Database Schema", completed: false },
      { title: "Testing Framework", completed: false },
    ],
  },
  {
    phase: "Week 3-4: Advanced Topics",
    status: "upcoming",
    modules: [
      { title: "Microservices Architecture", completed: false },
      { title: "CI/CD Deep Dive", completed: false },
      { title: "First Solo Project", completed: false },
    ],
  },
];

export const LearningMap = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Your Personalized Learning Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-generated 30-day roadmap based on your team's JIRA history and documentation
          </p>
        </div>

        <div className="space-y-6">
          {learningPhases.map((phase, index) => (
            <Card
              key={index}
              className={`p-6 border-l-4 transition-all ${
                phase.status === "current"
                  ? "border-l-secondary bg-card shadow-[var(--shadow-medium)]"
                  : phase.status === "completed"
                  ? "border-l-accent bg-card/50"
                  : "border-l-muted bg-card/50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {phase.status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  ) : phase.status === "current" ? (
                    <Clock className="w-6 h-6 text-secondary animate-pulse" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                  <h3 className="text-xl font-semibold text-foreground">{phase.phase}</h3>
                </div>
                <Badge
                  variant={phase.status === "current" ? "default" : "secondary"}
                  className={
                    phase.status === "current"
                      ? "bg-secondary text-secondary-foreground"
                      : ""
                  }
                >
                  {phase.status === "current"
                    ? "In Progress"
                    : phase.status === "completed"
                    ? "Completed"
                    : "Upcoming"}
                </Badge>
              </div>

              <div className="space-y-2 ml-9">
                {phase.modules.map((module, moduleIndex) => (
                  <div
                    key={moduleIndex}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                  >
                    {module.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                    <span
                      className={`${
                        module.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {module.title}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
