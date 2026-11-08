export function pathForCategory(slug: string): string {
  if (slug === "home") return "/";
  if (slug === "radio") return "/radio";
  return `/category/${slug}`;
}