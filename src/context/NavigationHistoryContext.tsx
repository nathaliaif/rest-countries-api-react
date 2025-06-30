import { createContext, useContext, useState, type ReactNode } from "react";
import type { Country } from "../types/country";

type NavigationHistoryState = {
  filter: Country[];
  currentPage: number;
  input: string;
  select: string;
};

type NavigationHistoryType = {
  navigationHistory: NavigationHistoryState;
  setNavigationHistory: React.Dispatch<
    React.SetStateAction<NavigationHistoryState>
  >;
};

export const NavigationHistory = createContext<
  NavigationHistoryType | undefined
>(undefined);

export function useNavigationHistory() {
  const context = useContext(NavigationHistory);
  if (!context) {
    throw new Error(
      "useNavigationHistory must be within a NavigationHistoryProvider"
    );
  }
  return context;
}

export function NavigationHistoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [navigationHistory, setNavigationHistory] =
    useState<NavigationHistoryState>({
      filter: [],
      currentPage: 1,
      input: "",
      select: "",
    });

  return (
    <NavigationHistory.Provider
      value={{ navigationHistory, setNavigationHistory }}
    >
      {children}
    </NavigationHistory.Provider>
  );
}
