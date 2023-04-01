import { Component, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { CheckoutDetailsModel } from 'src/app/models/checkout-details.model';
import { CityModel } from 'src/app/models/city.model';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';

import store from 'src/app/redux/store';
import { MatDialog } from '@angular/material/dialog';
import { TotalPricePipe } from 'src/app/pipes/total-price.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public cartItems: CartItemModel[];
  public cities: CityModel[];
  public search: string;

  public minDate = new Date();

  public checkoutDetails: CheckoutDetailsModel;
  public shippingCity: string;
  public shippingStreet: string;
  public creditCardNumber: number;
  public shippingDate: Date;

  public badShippingDate: boolean = false;

  constructor(
    private checkoutService: CheckoutService,
    public dialog: MatDialog,
    private totalPricePipe: TotalPricePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutDetails = new CheckoutDetailsModel();
    this.fetchCities();
    this.cartItems = store.getState().cartItemsState.cartItems;
  }

  async fetchCities() {
    try {
      this.cities = await this.checkoutService.getAllCities();
    } catch (err: any) {
      alert(err.message);
    }
  }

  myFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday from being selected.
    return day !== 5 && day !== 6;
  }

  dblclick() {
    this.shippingStreet = store.getState().authState.user.street;
    this.shippingCity = store.getState().authState.user.city;
  }

  async checkDate(shippingDate: Date) {
    try {
      this.badShippingDate = await this.checkoutService.checkDate(shippingDate);
      console.log('this.badShippingDate - ', this.badShippingDate);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async submitPayment(e: any) {
    this.setInitialDetails();

    this.checkoutDetails.shippingDate = this.shippingDate;

    console.log('this.checkoutDetails - ', this.checkoutDetails);

    const res = await this.checkoutService.checkout(this.checkoutDetails);

    if (res) this.openDialog();
  }

  setInitialDetails() {
    this.checkoutDetails = new CheckoutDetailsModel();
    this.checkoutDetails.user_id = store.getState().authState.user._id;
    this.checkoutDetails.cart_id = store.getState().cartState.cart._id;
    this.checkoutDetails.shippingCity = this.shippingCity;
    this.checkoutDetails.shippingStreet = this.shippingStreet;
    this.checkoutDetails.creditCardNumber = this.creditCardNumber;

    this.checkoutDetails.totalPrice = this.totalPricePipe.transform(
      this.cartItems
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      data: {
        cartItems: this.cartItems,
        checkoutDetails: this.checkoutDetails,
        totalPrice: this.checkoutDetails.totalPrice,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }
}
