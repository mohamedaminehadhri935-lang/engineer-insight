import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary p-12 border-0">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Limited Beta Access</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Transform Your Onboarding?
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join forward-thinking engineering teams reducing ramp-up time by 30%. 
              Get early access to OnboardIQ beta.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-lg font-semibold"
              >
                Request Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 h-12 px-8 text-lg backdrop-blur-sm"
              >
                Talk to Sales
              </Button>
            </div>
            
            <p className="text-sm text-white/80 pt-4">
              🔒 Enterprise-grade security • No credit card required • Setup in under 10 minutes
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
