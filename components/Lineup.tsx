"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";
import { Calendar, Music2, Ticket } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: number;
  artist: string;
  date: string;
  genre: string;
  image: string;
  label: string;
}

const events: Event[] = [
  {
    id: 1,
    artist: "Mathame",
    date: "June 21, 2025",
    genre: "Melodic Techno",
    image: "/artists/mathame.jpg",
    label: "Afterlife Records",
  },
  {
    id: 2,
    artist: "Adriatique",
    date: "July 12, 2025",
    genre: "Progressive House",
    image: "/artists/adriatique.jpg",
    label: "Siamese / Afterlife",
  },
  {
    id: 3,
    artist: "Mind Against",
    date: "August 3, 2025",
    genre: "Dark Melodic Techno",
    image: "/artists/mind-against.jpg",
    label: "Afterlife Records",
  },
];

export default function Lineup() {
  const { isNight } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !title || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power4.out",
      });

      cards.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 100,
          scale: 0.95,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 lg:py-40 overflow-hidden transition-colors duration-700 ${
        isNight ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[120px] transition-all duration-700 ${
            isNight ? "bg-fuchsia-600/10" : "bg-amber-400/10"
          }`}
        />
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-[120px] transition-all duration-700 ${
            isNight ? "bg-cyan-600/10" : "bg-yellow-400/10"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span
            className={`text-xs md:text-sm tracking-[0.4em] uppercase font-medium mb-6 block transition-colors duration-700 ${
              isNight ? "text-fuchsia-400" : "text-dmt-gold"
            }`}
          >
            Upcoming Rituals
          </span>

          <h2
            ref={titleRef}
            className={`font-heading text-4xl md:text-5xl lg:text-6xl font-bold transition-colors duration-700 ${
              isNight ? "text-white" : "text-dmt-black"
            }`}
          >
            The{" "}
            <span
              className={`transition-colors duration-700 ${
                isNight
                  ? "bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent"
                  : "text-dmt-gold"
              }`}
            >
              Lineup
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 ${
                isNight
                  ? "bg-white/[0.02] border-white/10 hover:border-cyan-500/50"
                  : "bg-black/[0.02] border-black/10 hover:border-dmt-gold/50"
              }`}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 ${
                  isNight
                    ? "shadow-[inset_0_0_80px_rgba(0,242,254,0.1)]"
                    : "shadow-[inset_0_0_80px_rgba(212,175,55,0.1)]"
                }`}
              />

              <div className="relative h-64 md:h-72 overflow-hidden">
                <div
                  className={`absolute inset-0 transition-colors duration-700 z-10 ${
                    isNight
                      ? "bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"
                      : "bg-gradient-to-t from-white via-transparent to-transparent"
                  }`}
                />
                <Image
                  src={event.image}
                  alt={event.artist}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md z-20 transition-colors duration-700 ${
                    isNight
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-dmt-gold/20 text-dmt-gold border border-dmt-gold/30"
                  }`}
                >
                  {event.label}
                </div>
              </div>

              <div className="relative p-6 md:p-8">
                <h3
                  className={`font-heading text-2xl md:text-3xl font-bold mb-4 transition-colors duration-700 ${
                    isNight ? "text-white" : "text-dmt-black"
                  }`}
                >
                  {event.artist}
                </h3>

                <div className="flex flex-col gap-3 mb-6">
                  <div
                    className={`flex items-center gap-3 text-sm transition-colors duration-700 ${
                      isNight ? "text-white/60" : "text-dmt-black/60"
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-sm transition-colors duration-700 ${
                      isNight ? "text-white/60" : "text-dmt-black/60"
                    }`}
                  >
                    <Music2 className="w-4 h-4" />
                    <span>{event.genre}</span>
                  </div>
                </div>

                <button
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-sm tracking-wide uppercase transition-all duration-500 ${
                    isNight
                      ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:from-cyan-400 hover:to-fuchsia-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                      : "bg-dmt-gold text-dmt-black hover:bg-amber-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
                  }`}
                >
                  <Ticket className="w-4 h-4" />
                  Asegurar Acceso
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
