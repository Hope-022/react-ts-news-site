import { SITE_NAME, SITE_TAGLINE } from "../../config/site";
import { CATEGORIES, RADIO_LINK } from "../../config/categories";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-white px-6 py-10 mt-10">
      <p className="text-2xl font-bold">{SITE_NAME}</p>
      <p className="text-sm text-green-100 mt-1">{SITE_TAGLINE}</p>

      <nav className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 mt-8 text-sm text-green-50">
        {[...CATEGORIES, RADIO_LINK].map((item) => (
          <a key={item.slug} href="#">
            {item.label}
          </a>
        ))}
      </nav>

      <p className="text-xs text-green-200 mt-8 pt-4 border-t border-green-700">
        © 2020 - {year} {SITE_NAME} Media Limited. All rights reserved.
      </p>
    </footer>
  );
}