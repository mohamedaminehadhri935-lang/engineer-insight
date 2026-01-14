import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const integrations = [
  { name: "GitHub", icon: "GH" },
  { name: "GitLab", icon: "GL" },
  { name: "Jira", icon: "JR" },
  { name: "Confluence", icon: "CF" },
  { name: "Notion", icon: "NT" },
  { name: "Slack", icon: "SL" },
  { name: "VS Code", icon: "VS" },
  { name: "Linear", icon: "LN" },
];

export const Integrations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="integrations" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Seamless Integration
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Works With Your Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect your existing tools and let OnboardMe do the rest
          </p>
        </motion.div>

        {/* Integration Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: 0.3 + index * 0.05,
                ease: "easeOut",
              }}
              className="group flex items-center gap-3 px-5 py-3 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                {integration.icon}
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {integration.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming soon text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          + Many more integrations coming soon
        </motion.p>
      </div>
    </section>
  );
};
