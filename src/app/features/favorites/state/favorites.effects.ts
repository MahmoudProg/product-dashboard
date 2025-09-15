import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as FavoritesActions from './favorites.actions';

@Injectable()
export class FavoritesEffects {
  constructor(private actions$: Actions) {}

    // Handle Favorites
    addToFavorites$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(FavoritesActions.addToFavorites),
          tap(({ product }) => {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
          })
        ),
      { dispatch: false }
    );

    removeFromFavorites$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(FavoritesActions.removeFromFavorites),
          tap(({ productId }) => {
            let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            favorites = favorites.filter((p: any) => p.id !== productId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
          })
        ),
      { dispatch: false }
    );
}
