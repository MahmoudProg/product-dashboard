import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { Product } from 'src/app/core/models/Product ';

export interface CartState {
  cart: Product[];
}

export const CartFeatureKey = 'Cart';
export const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]')
};

export const favoritesCartReducer = createReducer(
  initialState,


  on(CartActions.addToCart, (state, { product }) => {
    if (state.cart.some(p => p.id === product.id)) {
      return state; // Dont add again
    }
    return {
      ...state,
      cart: [...state.cart, product]
    };
  }),

  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    cart: state.cart.filter(p => p.id !== productId)
  })),

  on(CartActions.loadCartSuccess, (state, { cart }) => ({
    ...state,
    cart
  }))
)
