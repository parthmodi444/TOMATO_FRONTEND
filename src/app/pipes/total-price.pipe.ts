import { Pipe, PipeTransform } from '@angular/core';
import { CartItemModel } from '../models/cart-item.model';

@Pipe({
  name: 'totalPrice',
})
export class TotalPricePipe implements PipeTransform {
  transform(cartItems: CartItemModel[]): number {
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      let itemTotal = cartItems[i].price * cartItems[i].quantity;
      totalPrice += itemTotal;
    }

    return totalPrice;
  }
}
