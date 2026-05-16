"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";
import { Sparkles, Music, Eye, Waves } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const manifestoItems = [
  {
    icon: Sparkles,
    title: "Sensory Transcendence",
    description:
      "Every frequency calibrated, every light sculpted. We engineer moments that dissolve the boundary between listener and sound.",
  },
  {
    icon: Music,
    title: "Sonic Architecture",
    description:
      "From the ethereal melodics of Mathame to the hypnotic depths of Tale Of Us. Our soundscape is a journey through consciousness itself.",
  },
  {
    icon: Eye,
    title: "Visual Alchemy",
    description:
      "Projection mapping that breathes with the bass. LED installations that pulse with your heartbeat. Reality, reimagined.",
  },
  {
    icon: Waves,
    title: "Collective Resonance",
    description:
      "In the darkness, we find connection. In the rhythm, we find unity. DMT is not a club—it's a portal to shared experience.",
  },
];

export default function Experience() {
  const { isNight } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const items = itemsRef.current.filter(Boolean);

    if (!section || !title || items.length === 0) return;

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

      items.forEach((item, index) => {
        if (!item) return;

        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 80,
          duration: 1,
          delay: index * 0.15,
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
        isNight ? "bg-dmt-black" : "bg-dmt-light"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-0 left-0 w-full h-px transition-colors duration-700 ${
            isNight
              ? "bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
              : "bg-gradient-to-r from-transparent via-dmt-gold/30 to-transparent"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-full h-px transition-colors duration-700 ${
            isNight
              ? "bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent"
              : "bg-gradient-to-r from-transparent via-dmt-gold/30 to-transparent"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span
            className={`text-xs md:text-sm tracking-[0.4em] uppercase font-medium mb-6 block transition-colors duration-700 ${
              isNight ? "text-cyan-400" : "text-dmt-gold"
            }`}
          >
            The Philosophy
          </span>

          <h2
            ref={titleRef}
            className={`font-heading text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight transition-colors duration-700 ${
              isNight ? "text-white" : "text-dmt-black"
            }`}
          >
            Where Sound Becomes{" "}
            <span
              className={`transition-colors duration-700 ${
                isNight
                  ? "bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent"
                  : "text-dmt-gold"
              }`}
            >
              Sensation
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {manifestoItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className={`group relative p-8 md:p-10 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
                  isNight
                    ? "bg-white/[0.02] border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.04]"
                    : "bg-black/[0.02] border-black/10 hover:border-dmt-gold/30 hover:bg-black/[0.04]"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isNight
                      ? "bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5"
                      : "bg-gradient-to-br from-dmt-gold/5 to-amber-500/5"
                  }`}
                />

                <div className="relative z-10">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-all duration-500 ${
                      isNight
                        ? "bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 text-cyan-400 group-hover:from-cyan-500/30 group-hover:to-fuchsia-500/30"
                        : "bg-dmt-gold/10 text-dmt-gold group-hover:bg-dmt-gold/20"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3
                    className={`font-heading text-xl md:text-2xl font-semibold mb-4 transition-colors duration-700 ${
                      isNight ? "text-white" : "text-dmt-black"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-base md:text-lg leading-relaxed transition-colors duration-700 ${
                      isNight ? "text-white/60" : "text-dmt-black/60"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <p
            className={`text-lg md:text-xl italic max-w-3xl mx-auto leading-relaxed transition-colors duration-700 ${
              isNight ? "text-white/40" : "text-dmt-black/40"
            }`}
          >
            &ldquo;DMT is not merely a venue—it is a dimension. Enter with
            intention, leave transformed.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
