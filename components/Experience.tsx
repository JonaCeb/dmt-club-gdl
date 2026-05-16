"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Experience() {
  const { isNight } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textBlocksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && textBlocksRef.current) {
      gsap.fromTo(
        textBlocksRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="w-full max-w-7xl mx-auto py-40 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="font-syne text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8 leading-none">
          Un templo de estimulación sensorial.
        </h2>
        <div className={`w-24 h-[2px] transition-all duration-[1500ms] ${isNight ? "bg-[#00F2FE] shadow-[0_0_10px_#00F2FE]" : "bg-[#D4AF37]"}`} />
      </div>
      <div ref={textBlocksRef} className="font-inter space-y-6 text-sm md:text-base opacity-90 leading-relaxed text-justify">
        <p>
          DMT no es simplemente un club; es una desconexión total de la realidad urbana ordinaria. Diseñado como un espacio híbrido arquitectónico, transiciona de la frescura y libertad de una terraza al aire libre bajo la luz del día, al misterio hipnótico y la profundidad de un rave underground al caer la noche.
        </p>
        <p>
          Equipado con sistemas de acústica envolvente de última generación y una curaduría de pantallas y luces láser masivas, cada evento es un ritual guiado por los exponentes más avanzados de la escena electrónica global. Un viaje psicodélico y exclusivo reservado para aquellos que buscan perderse en las frecuencias del ritmo.
        </p>
      </div>
    </section>
  );
}
