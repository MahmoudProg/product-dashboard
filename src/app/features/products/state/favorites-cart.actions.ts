// favorites-cart.actions.ts
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
  props<{ cart: any[] }>() // ممكن تعمل interface CartItem لو حابب
);
