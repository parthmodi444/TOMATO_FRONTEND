import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CheckoutDetailsModel } from '../models/checkout-details.model';
import { firstValueFrom } from 'rxjs';
import { CityModel } from '../models/city.model';
import store from '../redux/store';

import { deleteCartAction } from '../redux/cart-state';
import { removeAllItemsAction } from '../redux/cart-items-state';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  public async getAllCities(): Promise<CityModel[]> {
    const cities = await firstValueFrom(
      this.http.get<CityModel[]>(environment.orderCitiesUrl)
    );

    return cities;
  }

  // ------------------------------------

  public async checkout(
    checkoutDetails: CheckoutDetailsModel
  ): Promise<boolean> {
    try {
      console.log('SERVICE - checkoutDetails - ', checkoutDetails);

      const res = await firstValueFrom(
        this.http.post<boolean>(environment.orderUrl, checkoutDetails)
      );
      if (res) store.dispatch(deleteCartAction());
      if (res) store.dispatch(removeAllItemsAction());
      return true;
    } catch (error) {
      return false;
    }
  }

  // ------------------------------------

  public async checkDate(date: Date): Promise<boolean> {
    let checkDate = { date: date };
    const isDateBad = await firstValueFrom(
      this.http.post<boolean>(environment.orderCheckDateUrl, checkDate)
    );
    return isDateBad;
  }
}
