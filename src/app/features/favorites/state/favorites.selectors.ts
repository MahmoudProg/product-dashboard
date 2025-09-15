import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.reducer';

export const selectFavoritesState =
  createFeatureSelector<FavoritesState>('favorites');

export const selectFavorites = createSelector(
  selectFavoritesState,
  state => state?.favorites ?? []
);

export const selectFavoritesCount = createSelector(
  selectFavorites,
  favorites => favorites.length
);
