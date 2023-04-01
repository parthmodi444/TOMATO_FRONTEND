import { CartItemModel } from '../models/cart-item.model';

export class CartItemsState {
  public cartItems: CartItemModel[] = [];
}

export enum CartItemsActionType {
  FETCH_CART_ITEMS = 'FETCH_CART_ITEMS',
  ADD_CART_ITEM = 'ADD_CART_ITEM',
  UPDATE_CART_ITEM = 'UPDATE_CART_ITEM',
  DELETE_CART_ITEM = 'DELETE_CART_ITEM',
  REMOVE_ALL_ITEMS_FROM_CART = 'REMOVE_ALL_ITEMS_FROM_CART',
}

export interface CartItemsAction {
  type: CartItemsActionType;
  payload?: any;
}

export function fetchCartItemsAction(
  cartItems: CartItemModel[]
): CartItemsAction {
  return { type: CartItemsActionType.FETCH_CART_ITEMS, payload: cartItems };
}
export function addCartItemAction(cartItem: CartItemModel): CartItemsAction {
  return { type: CartItemsActionType.ADD_CART_ITEM, payload: cartItem };
}
export function updateCartItemAction(cartItem: CartItemModel): CartItemsAction {
  return { type: CartItemsActionType.UPDATE_CART_ITEM, payload: cartItem };
}
export function deleteCartItemAction(_id: string): CartItemsAction {
  return { type: CartItemsActionType.DELETE_CART_ITEM, payload: _id };
}
export function removeAllItemsAction(): CartItemsAction {
  return { type: CartItemsActionType.REMOVE_ALL_ITEMS_FROM_CART };
}

export function cartItemsReducer(
  currentState = new CartItemsState(),
  action: CartItemsAction
): CartItemsState {
  const newState = { ...currentState };

  switch (action.type) {
    case CartItemsActionType.FETCH_CART_ITEMS:
      newState.cartItems = action.payload;
      break;

    case CartItemsActionType.ADD_CART_ITEM:
      newState.cartItems.push(action.payload);
      break;

    case CartItemsActionType.UPDATE_CART_ITEM:
      const indexToUpdate = newState.cartItems.findIndex(
        (i) => i._id === action.payload._id
      );
      if (indexToUpdate >= 0) {
        newState.cartItems[indexToUpdate].quantity = action.payload.quantity;
      }
      break;
    case CartItemsActionType.DELETE_CART_ITEM:
      const indexToDelete = newState.cartItems.findIndex(
        (i) => i._id === action.payload
      );
      if (indexToDelete >= 0) {
        newState.cartItems.splice(indexToDelete, 1);
      }
      break;
    case CartItemsActionType.REMOVE_ALL_ITEMS_FROM_CART:
      newState.cartItems = [];
      break;
  }
  return newState;
}
