export interface Category {
  id: string;
  name: string;
  slug: string;
  product_count?: number;
}

export interface Product {
  id: string;
  name: string;
  title?: string; 
  description: string;
  price: number; 
  images: string[];
  category?: string;
  variants?: Variant[];
}

export interface Variant {
  id: string;
  name: string;
  price?: number;
  inventory: number;
}