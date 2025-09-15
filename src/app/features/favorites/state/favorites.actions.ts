import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/models/Product ';
// ====================== FAVORITES ======================
export const addToFavorites = createAction(
  '[Favorites] Add To Favorites',
  props<{ product: Product }>()
);

export const removeFromFavorites = createAction(
  '[Favorites] Remove From Favorites',
  props<{ productId: number }>()
);

export const loadFavorites = createAction('[Favorites] Load Favorites from LocalStorage');

export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favorites: Product[] }>()
);
