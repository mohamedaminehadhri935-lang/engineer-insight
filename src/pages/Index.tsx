import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ChatDemo } from "@/components/ChatDemo";
import { LearningMap } from "@/components/LearningMap";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <ChatDemo />
      <LearningMap />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
