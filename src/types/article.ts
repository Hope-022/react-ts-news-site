export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  breaking?: boolean;
}
