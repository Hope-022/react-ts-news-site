import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  isSaved: boolean;
  onToggle: () => void;
}

export function BookmarkButton({ isSaved, onToggle }: BookmarkButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSaved}
      className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:border-green-800"
    >
      <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}