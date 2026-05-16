"use client";

import { useTheme } from "@/context/ThemeContext";
import { Instagram, Music2, MapPin } from "lucide-react";

export default function Footer() {
  const { isNight } = useTheme();

  return (
    <footer
      className={`relative py-16 md:py-20 overflow-hidden transition-colors duration-700 ${
        isNight ? "bg-[#030303]" : "bg-[#E8E8E8]"
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-px transition-colors duration-700 ${
          isNight
            ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
            : "bg-gradient-to-r from-transparent via-black/10 to-transparent"
        }`}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <h3
            className={`font-heading text-3xl md:text-4xl font-bold mb-4 transition-colors duration-700 ${
              isNight ? "text-white" : "text-dmt-black"
            }`}
          >
            DMT CLUB
          </h3>

          <p
            className={`text-sm md:text-base max-w-md mb-8 transition-colors duration-700 ${
              isNight ? "text-white/50" : "text-dmt-black/50"
            }`}
          >
            Guadalajara&apos;s premier destination for transcendent electronic
            music experiences.
          </p>

          <div className="flex items-center gap-4 mb-10">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full border transition-all duration-300 ${
                isNight
                  ? "border-white/10 text-white/60 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10"
                  : "border-black/10 text-dmt-black/60 hover:border-dmt-gold/50 hover:text-dmt-gold hover:bg-dmt-gold/10"
              }`}
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://soundcloud.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full border transition-all duration-300 ${
                isNight
                  ? "border-white/10 text-white/60 hover:border-fuchsia-500/50 hover:text-fuchsia-400 hover:bg-fuchsia-500/10"
                  : "border-black/10 text-dmt-black/60 hover:border-dmt-gold/50 hover:text-dmt-gold hover:bg-dmt-gold/10"
              }`}
              aria-label="SoundCloud"
            >
              <Music2 className="w-5 h-5" />
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full border transition-all duration-300 ${
                isNight
                  ? "border-white/10 text-white/60 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10"
                  : "border-black/10 text-dmt-black/60 hover:border-dmt-gold/50 hover:text-dmt-gold hover:bg-dmt-gold/10"
              }`}
              aria-label="Location"
            >
              <MapPin className="w-5 h-5" />
            </a>
          </div>

          <div
            className={`flex flex-col md:flex-row items-center gap-4 text-xs tracking-wider uppercase transition-colors duration-700 ${
              isNight ? "text-white/30" : "text-dmt-black/30"
            }`}
          >
            <span>© 2025 DMT Club Guadalajara</span>
            <span className="hidden md:inline">•</span>
            <span>All Rights Reserved</span>
            <span className="hidden md:inline">•</span>
            <span>21+ Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
