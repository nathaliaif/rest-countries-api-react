import { createContext, useContext, useState, type ReactNode } from "react";
import type { Country } from "../types/country";

type InfoState = {
  filter: Country[];
  currentPage: number;
  input: string;
  select: string;
};

type InfoContextType = {
  info: InfoState;
  setInfo: React.Dispatch<React.SetStateAction<InfoState>>;
};

export const InfoContext = createContext<InfoContextType | undefined>(
  undefined
);

export function useInfo() {
  const context = useContext(InfoContext);
  if (!context) {
    throw new Error("useInfo must be within a InfoProvider");
  }
  return context;
}

export function InfoProvider({ children }: { children: ReactNode }) {
  const [info, setInfo] = useState<InfoState>({
    filter: [],
    currentPage: 1,
    input: "",
    select: "",
  });

  return (
    <InfoContext.Provider value={{ info, setInfo }}>
      {children}
    </InfoContext.Provider>
  );
}
