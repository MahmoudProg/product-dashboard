//favorites-cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as FavoritesCartActions from './favorites-cart.actions';
import { Product } from 'src/app/core/models/Product ';

export interface FavoritesCartState {
  favorites: Product[];
  cart: Product[];
}
export const favoritesCartFeatureKey = 'favoritesCart';
export const initialState: FavoritesCartState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  cart: JSON.parse(localStorage.getItem('cart') || '[]')
};

export const favoritesCartReducer = createReducer(
  initialState,

  on(FavoritesCartActions.addToFavorites, (state, { product }) => {
    if (state.favorites.some(p => p.id === product.id)) {
      return state; // Dont add again
    }
    return {
      ...state,
      favorites: [...state.favorites, product]
    };
  }),

  on(FavoritesCartActions.removeFromFavorites, (state, { productId }) => ({
    ...state,
    favorites: state.favorites.filter(p => p.id !== productId)
  })),

  on(FavoritesCartActions.loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites
  })),

  on(FavoritesCartActions.addToCart, (state, { product }) => {
    if (state.cart.some(p => p.id === product.id)) {
      return state; // Dont add again
    }
    return {
      ...state,
      cart: [...state.cart, product]
    };
  }),

  on(FavoritesCartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    cart: state.cart.filter(p => p.id !== productId)
  })),

  on(FavoritesCartActions.loadCartSuccess, (state, { cart }) => ({
    ...state,
    cart
  }))
);
