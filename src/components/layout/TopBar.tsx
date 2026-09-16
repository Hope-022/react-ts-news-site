import { Bell } from "lucide-react";

export function TopBar() {
  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="hidden md:flex items-center justify-between px-4 py-1.5 text-xs border-b border-gray-100">
      <span className="text-gray-500">{today}</span>
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-1 text-green-800 font-medium">
          <Bell size={14} />
          Manage Notifications
        </button>
        <button className="text-green-800 font-semibold">Subscribe</button>
      </div>
    </div>
  );
}
