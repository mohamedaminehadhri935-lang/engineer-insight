import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Brain, Rocket } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Connect Your Stack",
    description:
      "Integrate with your existing tools in minutes. We automatically map your codebase, docs, and workflows.",
  },
  {
    icon: Brain,
    number: "02",
    title: "AI Learns Your Context",
    description:
      "Our AI analyzes your architecture, patterns, and conventions to create personalized onboarding paths.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Accelerate Onboarding",
    description:
      "New engineers get instant answers, guided tutorials, and context-aware assistance from day one.",
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your team up to speed in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:bg-card/80 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                {/* Step number */}
                <span className="absolute -top-3 -right-3 text-6xl font-bold text-primary/10 select-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
