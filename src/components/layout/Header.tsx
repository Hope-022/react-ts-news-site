import { Bookmark, Search, Menu } from "lucide-react";
import { Link } from "react-router";
import { SITE_NAME } from "../../config/site";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
      <Link to="/" className="text-2xl font-medium tracking-wide">
        {SITE_NAME}
      </Link>
      <div className="flex items-center gap-4 text-gray-600">
        <Link to="/saved" aria-label="Saved stories" className="hover:text-green-800">
          <Bookmark size={20} />
        </Link>
        <Link to="/search" aria-label="Search" className="hover:text-green-800">
          <Search size={20} />
        </Link>
        <Menu size={20} />
      </div>
    </header>
  );
}