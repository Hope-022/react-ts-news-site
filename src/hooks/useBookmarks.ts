import { useEffect, useState } from "react";

const STORAGE_KEY = "naija-wire:saved";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function useBookmarks() {
  const [saved, setSaved] = useState<string[]>(readSaved);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // storage can be full or blocked; saving just won't persist
    }
  }, [saved]);

  const isSaved = (slug: string) => saved.includes(slug);

  const toggle = (slug: string) =>
    setSaved((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [slug, ...current]
    );

  return { saved, isSaved, toggle };
}