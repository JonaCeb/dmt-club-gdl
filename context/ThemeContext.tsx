"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface ThemeContextType {
  isNight: boolean;
  toggleTheme: () => void;
  setNight: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isNight, setIsNight] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (isNight) {
      root.classList.add("night");
      root.classList.remove("day");
    } else {
      root.classList.add("day");
      root.classList.remove("night");
    }
  }, [isNight, mounted]);

  const toggleTheme = useCallback(() => {
    setIsNight((prev) => !prev);
  }, []);

  const setNight = useCallback((value: boolean) => {
    setIsNight(value);
  }, []);

  const value: ThemeContextType = {
    isNight,
    toggleTheme,
    setNight,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeContext };
