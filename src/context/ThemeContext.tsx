import { createContext, useContext, useState, type ReactNode } from "react";

type ThemeContextType = {
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function useDarkTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useDarkTheme must be within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
