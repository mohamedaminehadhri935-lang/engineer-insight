import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, TrendingUp, Shield, MessageSquare, BarChart3, Users } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "70% Faster Onboarding",
    description: "Reduce time-to-productivity from weeks to days with AI-guided learning paths.",
    metric: "70%",
    metricLabel: "faster",
  },
  {
    icon: TrendingUp,
    title: "Higher Retention",
    description: "Engineers who ramp up faster stay longer. Improve your 90-day retention rates.",
    metric: "3x",
    metricLabel: "better retention",
  },
  {
    icon: Shield,
    title: "Consistent Quality",
    description: "Standardized onboarding ensures every engineer gets the same high-quality experience.",
    metric: "100%",
    metricLabel: "coverage",
  },
  {
    icon: MessageSquare,
    title: "Instant Answers",
    description: "No more waiting for teammates. AI provides context-aware answers 24/7.",
    metric: "<1s",
    metricLabel: "response time",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Real-time dashboards show onboarding progress and identify knowledge gaps.",
    metric: "Real-time",
    metricLabel: "insights",
  },
  {
    icon: Users,
    title: "Team Knowledge",
    description: "Capture and share institutional knowledge before it walks out the door.",
    metric: "∞",
    metricLabel: "knowledge preserved",
  },
];

export const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Why OnboardMe
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Built for Engineering Teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to onboard developers faster and smarter
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="group relative p-6 rounded-2xl bg-card/40 border border-border/40 backdrop-blur-sm transition-all duration-300 hover:bg-card/70 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Metric badge */}
              <div className="absolute top-6 right-6 text-right">
                <div className="text-2xl font-bold text-primary">{benefit.metric}</div>
                <div className="text-xs text-muted-foreground">{benefit.metricLabel}</div>
              </div>

              <h3 className="text-lg font-semibold mb-2 pr-16">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
