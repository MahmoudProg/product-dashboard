import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from 'src/app/core/models/products.state';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectCategories = createSelector(
  selectProductsState,
  (state) => state.categories
);

export const selectSelectedCategory = createSelector(
  selectProductsState,
  (state) => state.selectedCategory
);

export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectSelectedCategory,
  (products, category) => {
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
  }
);
