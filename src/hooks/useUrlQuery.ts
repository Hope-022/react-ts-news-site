import { useState } from "react";
import { useSearchParams } from "react-router";
import { useDebouncedValue } from "./useDebouncedValue";

export function useUrlQuery(delayMs = 300) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState(searchParams.get("q") ?? "");
  const query = useDebouncedValue(text.trim(), delayMs);

  function setSearchText(value: string) {
    setText(value);
    const trimmed = value.trim();
    setSearchParams(trimmed ? { q: trimmed } : {}, { replace: true });
  }

  return { text, query, setSearchText, isWaiting: text.trim() !== query };
}