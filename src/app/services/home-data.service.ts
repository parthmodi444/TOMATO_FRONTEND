import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { CheckoutDetailsModel } from '../models/checkout-details.model';

@Injectable({
  providedIn: 'root',
})
export class HomeDataService {
  constructor(private http: HttpClient) {}

  public async getNumberOfProducts(): Promise<number> {
    const numberOfProducts = await firstValueFrom(
      this.http.get<number>(environment.numberOfProductsUrl)
    );
    return numberOfProducts;
  }

  // ------------------------------------

  public async getNumberOfOrders(): Promise<number> {
    const numberOfOrders = await firstValueFrom(
      this.http.get<number>(environment.numberOfOrdersUrl)
    );
    return numberOfOrders;
  }

  // ------------------------------------

  public async getLastOrder(): Promise<CheckoutDetailsModel> {
    const ordersFromUser = await firstValueFrom(
      this.http.get<CheckoutDetailsModel[]>(environment.lastOrderUrl)
    );
    return ordersFromUser[0];
  }
}
