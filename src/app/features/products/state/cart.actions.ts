
import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/models/Product ';

// Cart
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);

export const loadCartFromStorage = createAction('[Cart] Load From Storage');
export const loadCartSuccess = createAction(
  '[Cart] Load Success',
  props<{ cart: Product[] }>()
);
