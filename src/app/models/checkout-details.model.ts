export class CheckoutDetailsModel {
  _id: string;
  user_id: string;
  cart_id: string;
  totalPrice: number;
  shippingCity: string;
  shippingStreet: string;
  shippingDate: Date;
  creditCardNumber: number;

  createdAt: Date;
}
