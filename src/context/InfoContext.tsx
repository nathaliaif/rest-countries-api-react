import { createContext, useContext, useState, type ReactNode } from "react";

type InfoState = {
  input: string;
  select: string;
  currentPage: number;
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
    input: "",
    select: "",
    currentPage: 0,
  });

  return (
    <InfoContext.Provider value={{ info, setInfo }}>
      {children}
    </InfoContext.Provider>
  );
}
