"use client";

import { createContext, PropsWithChildren, useState } from "react";

type Mode = "light" | "dark";

type ThemeContextType = {
  mode: "light" | "dark";
  setMode: (mode: Mode) => void;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export const PropsProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<Mode>("light");

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
