import { Search, Menu } from "lucide-react";
import { SITE_NAME } from "../../config/site";
import { Link } from "react-router";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <Link to="/" className="text-2xl font-medium tracking-wide">
        {SITE_NAME}
      </Link>
      <div className="flex items-center gap-4 text-gray-600">
        <Link to="/search" aria-label="Search" className="hover:text-green-800">
          <Search size={20} />
        </Link>
        <Menu size={20} />
      </div>
    </header>
  );
}
