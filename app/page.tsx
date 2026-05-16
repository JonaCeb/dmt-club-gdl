"use client";

import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Lineup from "@/components/Lineup";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { isNight } = useTheme();

  return (
    <main
      className={`relative min-h-screen transition-colors duration-700 ${
        isNight ? "bg-dmt-black text-white" : "bg-dmt-light text-dmt-black"
      }`}
    >
      <Hero />
      <Experience />
      <Lineup />
      <BookingForm />
      <Footer />
    </main>
  );
}
