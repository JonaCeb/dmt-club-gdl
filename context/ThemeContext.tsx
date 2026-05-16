"use client";

import React, { createContext, useContext, useState } from "react";

type ThemeContextType = {
  isNight: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isNight, setIsNight] = useState<boolean>(true);

  const toggleTheme = () => {
    setIsNight((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isNight, toggleTheme }}>
      <div className={`transition-all duration-[1500ms] ease-in-out min-h-screen ${
        isNight ? "bg-[#050505] text-white selection:bg-[#00F2FE] selection:text-black" : "bg-[#F4F4F4] text-[#111111] selection:bg-[#D4AF37] selection:text-white"
      }`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe ser usado dentro de un ThemeProvider");
  return context;
}
