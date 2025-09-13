import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { ProductsState } from 'src/app/core/models/products.state';

export const productsFeatureKey = 'products';
export const initialState: ProductsState = {
  products: [],
  categories: [],
  selectedCategory: null,
    filters: {
    searchTerm: '',
    min: 0,
    max: Infinity
  },
  loading: false,
  error: null
};

export const productsReducer = createReducer(
  initialState,

  // Products
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Categories
  on(ProductsActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false
  })),
  on(ProductsActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Select Category
  on(ProductsActions.selectCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category,
  })),

  // Select Category
  on(ProductsActions.updateFilters, (state, { filters }) => ({
    ...state,
    filters
  })),
);
