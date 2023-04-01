import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModel } from '../models/cart.model';
import { fetchCartAction } from '../redux/cart-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  public async getCart(): Promise<CartModel> {
    const cart = await firstValueFrom(
      this.http.get<CartModel>(environment.cartUrl)
    );

    store.dispatch(fetchCartAction(cart));

    return cart;
  }

  // ------------------------------------

  public async createCart(): Promise<CartModel> {
    const newCart = await firstValueFrom(
      this.http.get<CartModel>(environment.cartNewUrl)
    );

    store.dispatch(fetchCartAction(newCart));

    return newCart;
  }

  // ------------------------------------

  public async forceNewCart(cart_id: string): Promise<CartModel> {
    const cart = await firstValueFrom(
      this.http.get<CartModel>(environment.cartUrl + cart_id)
    );
    console.log('cart service. forceNewCart - ', cart);

    store.dispatch(fetchCartAction(cart));

    return cart;
  }
}
