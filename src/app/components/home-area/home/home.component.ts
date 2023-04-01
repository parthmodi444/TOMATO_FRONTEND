import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { CartModel } from 'src/app/models/cart.model';
import { Unsubscribe } from 'redux';
import { CartService } from 'src/app/services/cart.service';
import store from 'src/app/redux/store';
import { logoutAction } from 'src/app/redux/auth-state';
import { HomeDataService } from 'src/app/services/home-data.service';
import { CheckoutDetailsModel } from 'src/app/models/checkout-details.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user: UserModel;
  public cart: CartModel;
  public checkout: CheckoutDetailsModel;

  public numberOfProducts: number;
  public numberOfOrders: number;

  private unsubscribeCart: Unsubscribe;
  private unsubscribeUser: Unsubscribe;

  constructor(
    private cartService: CartService,
    private homeDataService: HomeDataService
  ) {}

  ngOnInit(): void {
    this.subscription();
    this.getHomeData();

    if (this.user) this.getExistingCart();
  }

  subscription() {
    this.cart = store.getState().cartState.cart;
    this.unsubscribeCart = store.subscribe(() => {
      this.cart = store.getState().cartState.cart;
    });

    this.user = store.getState().authState.user;
    this.unsubscribeUser = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });
  }

  async getHomeData() {
    try {
      this.numberOfProducts = await this.homeDataService.getNumberOfProducts();
      this.numberOfOrders = await this.homeDataService.getNumberOfOrders();
      if (this.user) this.checkout = await this.homeDataService.getLastOrder();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async getExistingCart() {
    try {
      if (this.user && !this.cart) {
        this.cart = await this.cartService.getCart();
      }
    } catch (err: any) {
      if ((err.status = 401)) {
        console.log('Your token is invalid. Login again.');
        store.dispatch(logoutAction());
      } else {
        console.log('err - ', err);
        alert(err.message);
      }
    }
  }

  async createCart() {
    try {
      if (this.user) {
        this.cart = await this.cartService.createCart();
      }
    } catch (err: any) {
      if ((err.status = 401)) {
        console.log('Your token is invalid. Login again.');
        store.dispatch(logoutAction());
      } else {
        console.log('err - ', err);
        alert(err.message);
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeCart();
    this.unsubscribeUser();
  }
}
