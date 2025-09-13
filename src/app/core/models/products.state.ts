import { Product } from "./Product ";

export interface ProductsState {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  loading: boolean;
  error: string | null;
}
