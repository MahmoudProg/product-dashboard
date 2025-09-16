import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/models/Product ';

// ====================== CART ======================
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);

export const updateCartQuantity = createAction(
  '[Cart] Update Cart Quantity',
  props<{ productId: number; quantity: number }>()
);

export const loadCart = createAction('[Cart] Load Cart from LocalStorage');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ cart: any[] }>() 
);
