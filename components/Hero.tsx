"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export default function Hero() {
  const { isNight, toggleTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  const initParticles = useCallback((canvas: HTMLCanvasElement, night: boolean) => {
    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: night
          ? Math.random() > 0.5
            ? "#00F2FE"
            : "#F355DA"
          : "#D4AF37",
      });
    }
    return particles;
  }, []);

  const animateCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle) => {
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        const force = (150 - dist) / 150;
        particle.vx -= (dx / dist) * force * 0.02;
        particle.vy -= (dy / dist) * force * 0.02;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      particle.vx *= 0.99;
      particle.vy *= 0.99;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    particlesRef.current.forEach((p1, i) => {
      particlesRef.current.slice(i + 1).forEach((p2) => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = p1.color;
          ctx.globalAlpha = (1 - dist / 100) * 0.2;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });
    });

    animationFrameRef.current = requestAnimationFrame(animateCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas, isNight);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
      mouseRef.current = { x: clientX, y: clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);

    animateCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isNight, initParticles, animateCanvas]);

  useEffect(() => {
    if (!titleRef.current) return;

    const titleText = "DMT CLUB";
    titleRef.current.innerHTML = titleText
      .split("")
      .map((char) =>
        char === " "
          ? '<span class="inline-block">&nbsp;</span>'
          : `<span class="inline-block opacity-0">${char}</span>`
      )
      .join("");

    const chars = titleRef.current.querySelectorAll("span");

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power4.out",
      delay: 0.5,
    });

    gsap.from(chars, {
      y: 50,
      duration: 0.8,
      stagger: 0.08,
      ease: "power4.out",
      delay: 0.5,
    });
  }, []);

  useEffect(() => {
    if (!subtitleRef.current || !switchRef.current) return;

    gsap.from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      delay: 1.5,
    });

    gsap.from(switchRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 2,
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          background: isNight
            ? "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)"
            : "linear-gradient(180deg, #F4F4F4 0%, #E8E8E8 50%, #F4F4F4 100%)",
        }}
      />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] transition-all duration-1000 ${
            isNight ? "bg-cyan-500/10" : "bg-amber-400/10"
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] transition-all duration-1000 ${
            isNight ? "bg-fuchsia-500/10" : "bg-yellow-500/10"
          }`}
        />
      </div>

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <span
            className={`text-xs md:text-sm tracking-[0.4em] uppercase font-medium transition-colors duration-700 ${
              isNight ? "text-cyan-400" : "text-dmt-gold"
            }`}
          >
            Guadalajara, México
          </span>
        </div>

        <h1
          ref={titleRef}
          className={`font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 transition-colors duration-700 ${
            isNight ? "text-white" : "text-dmt-black"
          }`}
        >
          DMT CLUB
        </h1>

        <p
          ref={subtitleRef}
          className={`text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed transition-colors duration-700 ${
            isNight ? "text-white/70" : "text-dmt-black/70"
          }`}
        >
          Where consciousness expands and reality bends. An immersive sanctuary
          for those who seek the extraordinary.
        </p>

        <div
          ref={switchRef}
          className={`inline-flex items-center gap-4 p-2 rounded-full backdrop-blur-xl border transition-all duration-700 ${
            isNight
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
          }`}
        >
          <button
            onClick={() => !isNight || toggleTheme()}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
              !isNight
                ? "bg-dmt-gold text-dmt-black shadow-lg shadow-amber-500/20"
                : isNight
                ? "text-white/50 hover:text-white/80"
                : "text-dmt-black/50 hover:text-dmt-black/80"
            }`}
          >
            <Sun className="w-4 h-4" />
            <span className="hidden sm:inline">DAY EXPERIENCE</span>
            <span className="sm:hidden">DAY</span>
          </button>

          <button
            onClick={() => isNight || toggleTheme()}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
              isNight
                ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white shadow-lg shadow-cyan-500/20"
                : isNight
                ? "text-white/50 hover:text-white/80"
                : "text-dmt-black/50 hover:text-dmt-black/80"
            }`}
          >
            <Moon className="w-4 h-4" />
            <span className="hidden sm:inline">NIGHT RITUALS</span>
            <span className="sm:hidden">NIGHT</span>
          </button>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-colors duration-700 ${
          isNight ? "text-white/40" : "text-dmt-black/40"
        }`}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
