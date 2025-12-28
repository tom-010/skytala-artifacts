export interface ProductAttribute {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  date: string; // ISO date string YYYY-MM-DD
  link: string;
  heroImage: string;
  galleryImages: string[];
  attributes: ProductAttribute[];
  category: 'Productivity' | 'Developer Tools' | 'Design' | 'Analytics';
}