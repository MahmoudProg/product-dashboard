import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesCartState } from './favorites-cart.reducer';

export const selectFavoritesCartState =
  createFeatureSelector<FavoritesCartState>('favoritesCart');

export const selectFavorites = createSelector(
  selectFavoritesCartState,
  state => state?.favorites ?? []
);

export const selectCart = createSelector(
  selectFavoritesCartState,
  state => state?.cart ?? []
);

export const selectFavoritesCount = createSelector(
  selectFavorites,
  favorites => favorites.length
);

export const selectCartCount = createSelector(
  selectCart,
  cart => cart.length
);
