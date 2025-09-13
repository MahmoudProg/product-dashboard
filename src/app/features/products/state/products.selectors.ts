import { ProductsState } from './../../../core/models/products.state';
import { productsFeatureKey } from './products.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectProductsState =
  createFeatureSelector<ProductsState>(productsFeatureKey);

export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state?.products ?? []
);

export const selectCategories = createSelector(
  selectProductsState,
  (state) => ['all', ...(state?.categories ?? [])]
);

export const selectSelectedCategory = createSelector(
  selectProductsState,
  (state) => state?.selectedCategory ?? 'all'
);

export const selectLoading = createSelector(
  selectProductsState,
  (state) => state?.loading ?? false
);

export const selectError = createSelector(
  selectProductsState,
  (state) => state?.error ?? null
);

export const selectFilters = createSelector(
  selectProductsState,
  (state) => state?.filters ?? { searchTerm: '', min: null, max: null }
);

export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectSelectedCategory,
  selectFilters,
  (products, category, filters) => {
    let filtered = products;

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Search filter
    if (filters.searchTerm?.trim()) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(term));
    }

    // Price range filter
    if (filters.min != null && filters.min !== undefined) {
      filtered = filtered.filter(p => p.price >= +filters.min);
    }
    if (filters.max != null && filters.max !== undefined) {
      filtered = filtered.filter(p => p.price <= +filters.max);
    }

    return filtered;
  }
);


// export const selectFilteredProducts = createSelector(
//   selectAllProducts,
//   selectSelectedCategory,
//   (products, category) => {
//     if (!category || category === 'all') return products;
//     return products.filter((p) => p.category === category);
//   }
// );
