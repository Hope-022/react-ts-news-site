import { createContext, useContext } from "react";
import type { RadioStation } from "../types/radioStation";

export interface RadioContextValue {
  current: RadioStation | null;
  play: (station: RadioStation) => void;
  stop: () => void;
}

export const RadioContext = createContext<RadioContextValue | null>(null);

export function useRadio(): RadioContextValue {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error("useRadio must be used inside a RadioProvider");
  }
  return context;
}