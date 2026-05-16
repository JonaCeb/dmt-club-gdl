"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { gsap } from "gsap";

export default function Hero() {
  const { isNight, toggleTheme } = useTheme();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: "power4.out" }
    ).fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 0.8, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    );
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-between items-center px-6 py-8 overflow-hidden select-none">
      {/* Capa de Video DÍA */}
      <div className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out z-0 ${!isNight ? "opacity-30" : "opacity-0"}`}>
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          src="https://assets.mixkit.co/videos/preview/mixkit-womans-feet-splashing-in-a-pool-42314-large.mp4" 
        />
      </div>

      {/* Capa de Video NOCHE */}
      <div className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out z-0 ${isNight ? "opacity-40" : "opacity-0"}`}>
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover filter saturate-150"
          src="https://assets.mixkit.co/videos/preview/mixkit-laser-lights-at-a-stage-performance-42301-large.mp4" 
        />
      </div>

      {/* Overlay de gradiente para legibilidad tipográfica */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-[1500ms] ${
        isNight ? "bg-gradient-to-t from-[#050505] via-transparent to-black/50" : "bg-gradient-to-t from-[#F4F4F4] via-transparent to-white/30"
      }`} />

      {/* Header / Navbar */}
      <header className="w-full max-w-7xl flex justify-between items-center z-10">
        <span className="font-syne font-bold text-2xl tracking-[0.3em] backdrop-blur-sm px-2 py-1 rounded">DMT</span>
        
        {/* Switch Selector Líquido */}
        <button
          onClick={toggleTheme}
          className={`relative w-36 h-12 rounded-full p-1 flex items-center justify-between border transition-all duration-[1500ms] backdrop-blur-md ${
            isNight ? "border-[#222] bg-black/40" : "border-[#ccc] bg-white/40 shadow-sm"
          }`}
        >
          <span className="absolute text-[9px] font-bold tracking-widest left-4 opacity-60 font-syne">DAY</span>
          <span className="absolute text-[9px] font-bold tracking-widest right-4 opacity-60 font-syne">NIGHT</span>
          <div
            className={`w-14 h-10 rounded-full flex items-center justify-center transition-all duration-700 z-10 shadow-lg ${
              isNight ? "translate-x-[72px] bg-[#00F2FE] text-black shadow-[#00F2FE]/30" : "translate-x-0 bg-[#D4AF37] text-white shadow-[#D4AF37]/30"
            }`}
          >
            {isNight ? <Moon size={16} className="animate-spin-slow" /> : <Sun size={16} />}
          </div>
        </button>
      </header>

      {/* Título Central */}
      <div className="text-center z-10 my-auto pointer-events-none">
        <div className="overflow-hidden py-4">
          <h1 ref={titleRef} className="font-syne text-6xl md:text-9xl font-extrabold tracking-tighter uppercase mb-4 drop-shadow-2xl">
            {isNight ? "Night Rituals" : "Day Sessions"}
          </h1>
        </div>
        <p ref={subtitleRef} className="font-inter text-xs md:text-sm tracking-[0.4em] uppercase max-w-xl mx-auto drop-shadow">
          {isNight ? "Misticismo underground & techno inmersivo" : "Open air terrace & fine electronic energy"}
        </p>
      </div>

      {/* CTA Inferior */}
      <div className="z-10 w-full flex justify-center">
        <a href="#experience" className="font-syne text-[10px] tracking-[0.3em] uppercase opacity-50 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
          <span>Sumergirse en el espacio</span>
          <span className="animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
}
