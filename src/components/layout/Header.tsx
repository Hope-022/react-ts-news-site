import { Search, Menu } from "lucide-react";
import { SITE_NAME } from "../../config/site";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <span className="text-2xl font-medium tracking-wide">{SITE_NAME}</span>
      <div className="flex items-center gap-4 text-gray-600">
        <Search size={20} />
        <Menu size={20} />
      </div>
    </header>
  );
}
