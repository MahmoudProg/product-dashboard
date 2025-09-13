import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { ProductsState } from 'src/app/core/models/products.state';

export const initialState: ProductsState = {
  products: [],
  categories: [],
  selectedCategory: 'all',
  loading: false,
  error: null
};

export const productsReducer = createReducer(
  initialState,

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

  on(ProductsActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: ['all', ...categories]
  })),

  on(ProductsActions.selectCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category
  }))
);
