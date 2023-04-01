import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CartItemModel } from '../models/cart-item.model';
import {
  addCartItemAction,
  deleteCartItemAction,
  fetchCartItemsAction,
  removeAllItemsAction,
  updateCartItemAction,
} from '../redux/cart-items-state';
import store from '../redux/store';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartItemsService {
  constructor(private http: HttpClient) {}

  public async getCartItems(_id: string): Promise<CartItemModel[]> {
    const cartItems = await firstValueFrom(
      this.http.get<CartItemModel[]>(environment.cartItemsUrl + _id)
    );
    // console.log('cart Items service. cart items - ', cartItems);

    store.dispatch(fetchCartItemsAction(cartItems));

    return cartItems;
  }
  // ------------------------------------

  public async addCartItem(
    product: ProductModel,
    quantity: number
  ): Promise<CartItemModel> {
    // check if cart item exsits. if it exists pass to update function.
    const cartItems = store.getState().cartItemsState.cartItems;
    const cartItemIndex = cartItems.findIndex(
      (ci) => ci.product_id === product._id
    );
    const cartItem = cartItems[cartItemIndex];
    if (cartItemIndex >= 0) {
      return this.updateCartItem(cartItem._id, quantity);
    }

    let item = new CartItemModel();
    item.product_id = product._id;
    item.name = product.name;
    item.price = product.price;
    item.quantity = quantity;
    item.cart_id = store.getState().cartState.cart._id;

    const addedCartItem = await firstValueFrom(
      this.http.post<CartItemModel>(environment.cartItemsUrl, item)
    );

    store.dispatch(addCartItemAction(addedCartItem));

    return addedCartItem;
  }

  // ------------------------------------

  public async updateCartItem(
    cartItemId: string,
    addQuantity: number
  ): Promise<CartItemModel> {
    const cartItems = store.getState().cartItemsState.cartItems;
    const cartItemIndex = cartItems.findIndex((ci) => ci._id === cartItemId);
    const cartItem = cartItems[cartItemIndex];

    let exsitingQuantity = +cartItem.quantity;
    let newQuantity = +addQuantity + exsitingQuantity;

    const updatedCartItem = await firstValueFrom(
      this.http.put<CartItemModel>(environment.cartItemsUrl + cartItemId, {
        newQuantity,
      })
    );

    store.dispatch(updateCartItemAction(updatedCartItem));

    return updatedCartItem;
  }
  // ------------------------------------

  public async deleteCartItem(_id: string): Promise<void> {
    store.dispatch(deleteCartItemAction(_id));
    // console.log('cart Items service. deleted cart item - id - ', _id);

    await firstValueFrom(
      this.http.delete<CartItemModel>(environment.cartItemsUrl + _id)
    );
  }

  // ------------------------------------

  public async removeAllItemsFromCart(cart_id: string): Promise<void> {
    console.log(
      'cart Items service. deleted ALL cart items - from cart_id: ',
      cart_id
    );
    store.dispatch(removeAllItemsAction());

    await firstValueFrom(
      this.http.delete<CartItemModel>(
        environment.removeAllCartItemsUrl + cart_id
      )
    );
  }
}
