"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Marquee() {
  const { isNight } = useTheme();

  const phrase = " • TECHNO • MELODIC • AFTERLIFE VIBES • DMT CLUB • OPEN AIR • PSYCHEDELIC RITUALS • UNDERGROUND ";

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap border-y py-4 md:py-6 uppercase font-syne font-black text-2xl md:text-5xl tracking-widest transition-all duration-[1500ms] ${
      isNight ? "border-[#111] bg-[#090909] text-white/5" : "border-[#e0e0e0] bg-white text-black/5"
    }`}>
      <div className="inline-block animate-marquee">
        <span className={`transition-colors duration-[1500ms] ${isNight ? "group-hover:text-[#00F2FE]" : "group-hover:text-[#D4AF37]"}`}>{phrase}</span>
        <span>{phrase}</span>
        <span>{phrase}</span>
      </div>
    </div>
  );
}