export interface ProductAttribute {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  date: string;
  link: string;
  heroImage: string;
  galleryImages: string[];
  attributes: ProductAttribute[];
  category: "Productivity" | "Developer Tools" | "Design" | "Analytics";
}
