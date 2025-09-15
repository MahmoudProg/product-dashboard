import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {
constructor(private actions$: Actions) {}
  // Handle Cart
  addToCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.addToCart),
        tap(({ product }) => {
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          const existing = cart.find((p: any) => p.id === product.id);

          if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
          } else {
            cart.push({ ...product, quantity: 1 });
          }

          localStorage.setItem('cart', JSON.stringify(cart));
        })
      ),
    { dispatch: false }
  );

  removeFromCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.removeFromCart),
        tap(({ productId }) => {
          let cart = JSON.parse(localStorage.getItem('cart') || '[]');
          cart = cart.filter((p: any) => p.id !== productId);
          localStorage.setItem('cart', JSON.stringify(cart));
        })
      ),
    { dispatch: false }
  );

  updateCartQuantity$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.updateCartQuantity),
        tap(({ productId, quantity }) => {
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          const item = cart.find((p: any) => p.id === productId);
          if (item) {
            item.quantity = quantity;
          }
          localStorage.setItem('cart', JSON.stringify(cart));
        })
      ),
    { dispatch: false }
  );

}
