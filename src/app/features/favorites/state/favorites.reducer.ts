import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';
import { Product } from 'src/app/core/models/Product ';

export interface FavoritesState {
  favorites: Product[];
}

export const favoritesFeatureKey = 'favorites';
export const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

export const favoritesReducer = createReducer(
    initialState,

    on(FavoritesActions.addToFavorites, (state, { product }) => {
      if (state.favorites.some(p => p.id === product.id)) {
        return state; // Dont add again
      }
      return {
        ...state,
        favorites: [...state.favorites, product]
      };
    }),

    on(FavoritesActions.removeFromFavorites, (state, { productId }) => ({
      ...state,
      favorites: state.favorites.filter(p => p.id !== productId)
    })),

    on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
      ...state,
      favorites
    })),

)

