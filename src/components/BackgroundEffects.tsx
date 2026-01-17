import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";

interface MousePosition {
  x: number;
  y: number;
}

export const BackgroundEffects = () => {
  const prefersReducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth spring animations for mouse tracking
  const springConfig = { damping: 25, stiffness: 100 };
  const mouseX = useSpring(0.5, springConfig);
  const mouseY = useSpring(0.5, springConfig);

  // Parallax transforms for orbs
  const orb1X = useTransform(mouseX, [0, 1], [-20, 20]);
  const orb1Y = useTransform(mouseY, [0, 1], [-20, 20]);
  const orb2X = useTransform(mouseX, [0, 1], [15, -15]);
  const orb2Y = useTransform(mouseY, [0, 1], [10, -10]);
  const orb3X = useTransform(mouseX, [0, 1], [-10, 10]);
  const orb3Y = useTransform(mouseY, [0, 1], [-15, 15]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, mouseX, mouseY]);

  if (prefersReducedMotion) {
    // Static, simple background for reduced motion
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        <div className="absolute inset-0 opacity-[0.015]" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} 
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 50% at 20% 40%, hsl(220 12% 18% / 0.5) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 60%, hsl(160 40% 20% / 0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 30% 50%, hsl(220 12% 18% / 0.5) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 70% 40%, hsl(160 40% 20% / 0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 20% 40%, hsl(220 12% 18% / 0.5) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 60%, hsl(160 40% 20% / 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating orbs with parallax */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, hsl(160 60% 35% / 0.12) 0%, transparent 70%)",
          top: "10%",
          left: "15%",
          x: orb1X,
          y: orb1Y,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(158 50% 30% / 0.1) 0%, transparent 70%)",
          top: "50%",
          right: "10%",
          x: orb2X,
          y: orb2Y,
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blur-[80px]"
        style={{
          background: "radial-gradient(circle, hsl(220 15% 25% / 0.15) 0%, transparent 70%)",
          bottom: "20%",
          left: "40%",
          x: orb3X,
          y: orb3Y,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Light sweep effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(160 60% 50% / 0.03) 50%, transparent 60%)",
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 5,
        }}
      />

      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(220_12%_6%/0.5)_80%,hsl(220_12%_4%/0.9)_100%)]" />
    </div>
  );
};
