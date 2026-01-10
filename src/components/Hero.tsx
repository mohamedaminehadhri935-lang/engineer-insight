import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import onboardmeLogo from "@/assets/onboardme-logo.png";
import onboardmeLogoSymbol from "@/assets/onboardme-logo-symbol.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Dark premium gradient background */}
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(265_35%_4%/0.4)_70%,hsl(265_35%_3%/0.8)_100%)]" />
      
      {/* Logo watermark - enlarged 3x, positioned top-right, semi-transparent */}
      <div 
        className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-[0.08] blur-[2px] pointer-events-none"
        style={{
          backgroundImage: `url(${onboardmeLogoSymbol})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Subtle soft lighting glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      {/* Header with Logo */}
      <header className="relative z-20 w-full py-6 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={onboardmeLogo} 
              alt="OnboardMe Logo" 
              className="h-12 w-auto"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">Demo</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-Powered Engineering Onboarding</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Onboard Engineers
              </span>
              <br />
              <span className="text-foreground">30% Faster with AI</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform your internal docs and JIRA tickets into personalized learning paths. 
              Get new engineers productive in days, not months.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-lg font-semibold shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-glow)] transition-all"
              >
                Get Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 h-12 px-8 text-lg"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="pt-8 flex flex-col items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join 50+ engineering teams ramping up faster
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
