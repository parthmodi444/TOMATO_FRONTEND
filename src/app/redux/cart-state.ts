import { CartModel } from '../models/cart.model';

export class CartState {
  public cart: CartModel;
}

export enum CartActionType {
  FETCH_CART = 'FETCH_CART',
  DELETE_CART = 'DELETE_CART',
}

export interface CartAction {
  type: CartActionType;
  payload?: any;
}

export function fetchCartAction(cart: CartModel): CartAction {
  return { type: CartActionType.FETCH_CART, payload: cart };
}
export function deleteCartAction(): CartAction {
  return { type: CartActionType.DELETE_CART };
}

export function cartReducer(
  currentState = new CartState(),
  action: CartAction
): CartState {
  const newState = { ...currentState };

  switch (action.type) {
    case CartActionType.FETCH_CART:
      newState.cart = action.payload;

      break;
    case CartActionType.DELETE_CART:
      newState.cart = null;

      break;
  }

  return newState;
}
