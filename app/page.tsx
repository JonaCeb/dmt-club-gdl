"use client";

import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Lineup from "@/components/Lineup";
import BookingForm from "@/components/BookingForm";
import Marquee from "@/components/Marquee";
import CustomCursor from "@/components/CustomCursor";
import Magnetic from "@/components/Magnetic";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Inyectar el cursor premium en todo el sitio */}
      <CustomCursor />
      
      <Hero />
      
      {/* Separador fluido e infinito entre secciones */}
      <Marquee />
      
      <Experience />
      
      <Lineup />
      
      <BookingForm />

      {/* Ejemplo extra: Footer minimalista con botón magnético */}
      <footer className="w-full text-center py-12 font-inter text-[10px] tracking-widest opacity-40 uppercase">
        © 2026 DMT Club Guadalajara • Desarrollado con Vanguardia Creativa.
      </footer>
    </main>
  );
}
