import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Building2, Users, Zap } from "lucide-react";
import { BackgroundEffects } from "./BackgroundEffects";
import { Navbar } from "./Navbar";

// Placeholder logos for social proof
const TrustLogos = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="mt-12 pt-8 border-t border-border/30"
  >
    <p className="text-sm text-muted-foreground mb-6">
      Trusted by engineering teams at
    </p>
    <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-6 w-20 bg-muted-foreground/30 rounded"
          aria-label={`Partner company ${i}`}
        />
      ))}
    </div>
  </motion.div>
);

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto max-w-5xl text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              AI-Powered Developer Onboarding
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-foreground">Onboard Engineers</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent">
              70% Faster
            </span>{" "}
            <span className="text-foreground">with AI</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Transform your developer onboarding with intelligent context mapping,
            personalized learning paths, and real-time AI assistance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button
              size="lg"
              className="group relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-14 px-8 text-base font-semibold shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Early Access
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              {/* Hover glow effect */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group rounded-full h-14 px-8 text-base font-medium border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted/50 hover:border-primary/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Play className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <span>50+ Engineering Teams</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>1,000+ Developers Onboarded</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>2 Week Average Time Saved</span>
            </div>
          </motion.div>

          {/* Trust Logos */}
          <TrustLogos />
        </motion.div>
      </div>
    </section>
  );
};
