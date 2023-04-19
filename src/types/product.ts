export interface Product {
  id: string;
  code: string;
  name: string;
  description: string; // Long text
  imageUrl: string; // Url format
  price: number;
  category: string;
  createAt: string; // Date format
}
