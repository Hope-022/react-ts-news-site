import { useRadio } from "../../context/radioContext";
import { RadioPlayer } from "./RadioPlayer";

export function GlobalRadioPlayer() {
  const { current, stop } = useRadio();
  if (!current) return null;
  return <RadioPlayer key={current.id} station={current} onClose={stop} />;
}