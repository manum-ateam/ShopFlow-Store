export interface Product {
  id: string;
  title: string;
  price: number; // cents
  images: string[];
  variants: Variant[];
}

export interface Variant {
  id: string;
  name: string;
  stock: number;
}