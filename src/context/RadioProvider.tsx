import { useMemo, useState, type ReactNode } from "react";
import type { RadioStation } from "../types/radioStation";
import { RadioContext } from "./radioContext";

export function RadioProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<RadioStation | null>(null);

  const value = useMemo(
    () => ({ current, play: setCurrent, stop: () => setCurrent(null) }),
    [current]
  );

  return <RadioContext.Provider value={value}>{children}</RadioContext.Provider>;
}