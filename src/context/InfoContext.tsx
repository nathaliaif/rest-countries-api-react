import { createContext, useContext, useState, type ReactNode } from "react";

type InfoContextType = {
  info: string;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
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
  const [info, setInfo] = useState("");

  return (
    <InfoContext.Provider value={{ info, setInfo }}>
      {children}
    </InfoContext.Provider>
  );
}
