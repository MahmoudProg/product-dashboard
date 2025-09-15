// meta-reducers/local-storage.metareducer.ts
import { ActionReducer } from '@ngrx/store';
import { FavoritesCartState } from './favorites-cart.reducer';

export function localStorageSyncMetaReducer(
  reducer: ActionReducer<FavoritesCartState>
): ActionReducer<FavoritesCartState> {
  return (state, action) => {
    const nextState = reducer(state, action);

    // Sync Favorites
    localStorage.setItem('favorites', JSON.stringify(nextState.favorites));
    // Sync Cart
    localStorage.setItem('cart', JSON.stringify(nextState.cart));

    return nextState;
  };
}
