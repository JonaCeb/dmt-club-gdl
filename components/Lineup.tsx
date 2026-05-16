"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Calendar } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EVENTS = [
  { id: 1, date: "MAY 23", artist: "MATHAME", genre: "Melodic Techno", vibe: "Night Ritual" },
  { id: 2, date: "JUN 06", artist: "8KAYS", genre: "Progressive House", vibe: "Sunset Session" },
  { id: 3, date: "JUN 20", artist: "MUSHROOM EXP", genre: "Psytrance / Progressive", vibe: "Psychedelic Night" }
];

export default function Lineup() {
  const { isNight } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto py-24 px-6">
      <div className="mb-16">
        <span className="font-inter text-xs tracking-[0.4em] uppercase opacity-60">Próximos Encuentros</span>
        <h2 className="font-syne text-4xl md:text-7xl font-bold uppercase mt-2">Lineup Oficial</h2>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {EVENTS.map((event) => (
          <div
            key={event.id}
            className={`group relative p-8 rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col justify-between h-96 backdrop-blur-sm ${
              isNight 
                ? "bg-[#0c0c0c]/80 border-[#1a1a1a] hover:border-[#00F2FE] hover:shadow-[0_0_40px_rgba(0,242,254,0.15)]" 
                : "bg-white/80 border-[#e0e0e0] hover:border-[#D4AF37] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
            }`}
          >
            {/* Efecto de resplandor interno en Hover */}
            <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[50px] transition-opacity duration-500 opacity-0 group-hover:opacity-40 pointer-events-none ${
              isNight ? "bg-[#F355DA]" : "bg-[#D4AF37]"
            }`} />

            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-syne font-bold text-sm tracking-widest opacity-60 flex items-center gap-2">
                  <Calendar size={14} /> {event.date}
                </span>
                <span className={`text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full transition-colors duration-500 ${
                  isNight ? "bg-[#161616] text-[#F355DA]" : "bg-[#f5f5f5] text-[#D4AF37]"
                }`}>
                  {event.vibe}
                </span>
              </div>
              <h3 className="font-syne text-4xl font-extrabold tracking-tight mb-2 group-hover:translate-x-1 transition-transform duration-300">
                {event.artist}
              </h3>
              <p className="font-inter text-xs opacity-60 tracking-wider">{event.genre}</p>
            </div>

            <a
              href="#booking"
              className={`w-full py-4 rounded-xl font-syne text-center text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                isNight 
                  ? "bg-transparent border-[#222] text-white hover:bg-white hover:text-black" 
                  : "bg-transparent border-[#ccc] text-black hover:bg-black hover:text-white"
              }`}
            >
              Asegurar Acceso
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
