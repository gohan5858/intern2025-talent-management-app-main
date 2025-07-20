"use client";

import { createContext, useState, ReactNode, useContext } from "react";

export type ThemeMode = "light" | "dark";

const ThemeContext = createContext<{
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <div className={`Mode ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
