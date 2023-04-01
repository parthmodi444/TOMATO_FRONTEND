import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { CartModel } from 'src/app/models/cart.model';
import { TotalPricePipe } from 'src/app/pipes/total-price.pipe';
import { logoutAction } from 'src/app/redux/auth-state';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { CartItemsService } from 'src/app/services/cartItems.service';

@Component({
  selector: 'app-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.css'],
})
export class CartItemListComponent implements OnInit {
  public cart: CartModel;
  public cartItems: CartItemModel[];
  public totalPrice: number;
  public items: number;

  private unsubscribeCart: Unsubscribe;
  private unsubscribeCartItems: Unsubscribe;

  constructor(
    private cartItemsService: CartItemsService,
    private totalPricePipe: TotalPricePipe,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCart();

    this.subscription();

    if (this.cart) this.getCartItems(this.cart._id);
  }

  subscription() {
    this.cart = store.getState().cartState.cart;
    if (!this.cart) this.getCart;
    this.unsubscribeCart = store.subscribe(() => {
      this.cart = store.getState().cartState.cart;
    });

    this.cartItems = store.getState().cartItemsState.cartItems;
    this.unsubscribeCartItems = store.subscribe(() => {
      this.cartItems = store.getState().cartItemsState.cartItems;
      this.totalPrice = this.totalPricePipe.transform(this.cartItems);

      this.items = this.cartItems.length;
    });
  }

  async getCart() {
    try {
      if (!store.getState().cartState.cart) {
        this.cart = await this.cartService.getCart();
      }
      this.cart = store.getState().cartState.cart;
    } catch (err: any) {
      if ((err.status = 401)) {
        alert('Your token is invalid. Login again.');
        store.dispatch(logoutAction());
      } else {
        alert(err.message);
      }
    }
  }

  async getCartItems(_id: string) {
    try {
      this.cartItems = await this.cartItemsService.getCartItems(_id);
    } catch (err: any) {
      alert(err.message);
    }
  }

  async removeAllItemsFromCart() {
    try {
      if (
        confirm('Are you sure you want to remove all items from cart?') == true
      ) {
        await this.cartItemsService.removeAllItemsFromCart(this.cart._id);
      } else {
        return;
      }
    } catch (err: any) {
      alert(err.message);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeCartItems();
    this.unsubscribeCart();
  }
}
