import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { CartItemsService } from 'src/app/services/cartItems.service';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css'],
})
export class CartItemCardComponent {
  @Input()
  public cartItem: CartItemModel;

  constructor(
    private cartItemsService: CartItemsService
  )
  {}

  async decrementOneItem() {
    try {
      if (this.cartItem.quantity <= 1) {
        this.deleteItem();
        return;
      }
      await this.cartItemsService.updateCartItem(this.cartItem._id, -1);
    } catch (err: any) {
      alert(err.message);
    }
  }

  async incrementOneItem() {
    try {
      await this.cartItemsService.updateCartItem(this.cartItem._id, 1);
    } catch (err: any) {
      alert(err.message);
    }
  }

  async deleteItem() {
    try {
      await this.cartItemsService.deleteCartItem(this.cartItem._id);
    } catch (err: any) {
      alert(err.message);
    }
  }
}
