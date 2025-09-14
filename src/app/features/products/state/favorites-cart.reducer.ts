import { createReducer, on } from '@ngrx/store';
import * as FavoritesCartActions from './favorites-cart.actions';
import { Product } from 'src/app/core/models/Product ';

export interface FavoritesCartState {
  favorites: Product[];
  cart: Product[];
}

export const initialState: FavoritesCartState = {
  favorites: [],
  cart: []
};

export const favoritesCartReducer = createReducer(
  initialState,

  // Favorites
  on(FavoritesCartActions.addToFavorites, (state, { product }) => ({
    ...state,
    favorites: [...state.favorites, product]
  })),

  on(FavoritesCartActions.removeFromFavorites, (state, { productId }) => ({
    ...state,
    favorites: state.favorites.filter(p => p.id !== productId)
  })),

  on(FavoritesCartActions.loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites
  })),

  // Cart
  on(FavoritesCartActions.addToCart, (state, { product }) => ({
    ...state,
    cart: [...state.cart, product]
  })),

  on(FavoritesCartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    cart: state.cart.filter(p => p.id !== productId)
  })),

  on(FavoritesCartActions.loadCartSuccess, (state, { cart }) => ({
    ...state,
    cart
  }))
);
