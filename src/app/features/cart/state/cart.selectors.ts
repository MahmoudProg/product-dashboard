import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectFavoritesCartState =
  createFeatureSelector<CartState>('Cart');

export const selectCart = createSelector(
  selectFavoritesCartState,
  state => state?.cart ?? []
);

export const selectCartCount = createSelector(
  selectCart,
  cart => cart.length
);
