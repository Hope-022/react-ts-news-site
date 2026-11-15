import { NavLink } from "react-router";
import { Bookmark, Home, Radio, Search } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/radio", label: "Radio", icon: Radio, end: false },
  { to: "/search", label: "Search", icon: Search, end: false },
  { to: "/saved", label: "Saved", icon: Bookmark, end: false },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 flex h-14 border-t border-gray-200 bg-white md:hidden"
    >
      {ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center gap-0.5 text-xs ${
              isActive ? "font-semibold text-green-800" : "text-gray-500"
            }`
          }
        >
          <Icon size={20} aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}