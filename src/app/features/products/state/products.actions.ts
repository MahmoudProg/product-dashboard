import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/models/Product ';

export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);

export const loadCategories = createAction('[Products] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Products] Load Categories Success',
  props<{ categories: string[] }>()
);
export const loadCategoriesFailure = createAction(
  '[Products] Load Categories Failure',
  props<{ error: string }>()
);

export const selectCategory = createAction(
  '[Products] Select Category',
  props<{ category: string }>()
);

// export const setSearchTerm = createAction(
//   '[Products] Set Search Term',
//   props<{ searchTerm: string }>()
// );

// export const setPriceRange = createAction(
//   '[Products] Set Price Range',
//   props<{ min: number; max: number }>()
// );

export const updateFilters = createAction(
  '[Products] Set Filters',
  props<{ filters: {
    searchTerm: string;
    min: number;
    max: number;
    sortBy: 'price' | 'title' | null;
    sortOrder: 'asc' | 'desc' | null;
    page: number;
    pageSize: number;
  } }>()
);

export const setFilters = createAction(
  '[Products] Set Filters',
  props<{ filters: { searchTerm: string; min: number; max: number; sortBy: 'price' | 'title' | null; sortOrder: 'asc' | 'desc' | null } }>()
);
