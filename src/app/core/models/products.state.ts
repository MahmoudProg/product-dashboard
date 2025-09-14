import { Product } from "./Product ";

export interface ProductsState {
  products: Product[];
  categories: string[];
  selectedCategory: string | null;
  filters: {
    searchTerm: string;
    min: number;
    max: number;
    sortBy: 'price' | 'title' | null;
    sortOrder: 'asc' | 'desc' | null;
    page: number ;
    pageSize: number ;
  };
  loading: boolean;
  error: string | null;
}
