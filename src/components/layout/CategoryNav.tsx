import { CATEGORIES, RADIO_LINK, type Category } from "../../config/categories";

interface CategoryNavProps {
  activeSlug?: string;
}

export function CategoryNav({ activeSlug = "home" }: CategoryNavProps) {
  const allItems: Category[] = [
    { slug: "home", label: "Home" },
    ...CATEGORIES,
    RADIO_LINK,
  ];

  return (
    <nav className="relative border-b border-gray-200">
      <div className="flex gap-5 overflow-x-auto whitespace-nowrap px-4 py-2.5 snap-x snap-mandatory md:overflow-visible md:flex-wrap md:gap-6">
        {allItems.map((item) => (
          <a
            key={item.slug}
            href="#"
            aria-current={item.slug === activeSlug ? "page" : undefined}
            className={`snap-start text-xs font-semibold uppercase tracking-wide pb-1 border-b-2 ${
              item.slug === activeSlug
                ? "text-green-800 border-green-800"
                : "text-gray-800 border-transparent"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent md:hidden" />
    </nav>
  );
}
