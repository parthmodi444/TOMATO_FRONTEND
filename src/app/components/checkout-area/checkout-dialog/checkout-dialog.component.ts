import { Component, Inject, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { CheckoutDetailsModel } from 'src/app/models/checkout-details.model';
import store from 'src/app/redux/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import jsPDFInvoiceTemplate from 'jspdf-invoice-template';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css'],
})
export class CheckoutDialogComponent implements OnInit {
  public props: any = {};
  public cartItems: CartItemModel[];
  public checkoutDetails: CheckoutDetailsModel;
  public totalPrice: number = 0;
  public now: any = new Date(Date.now()).toISOString();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.cartItems = this.data.cartItems;
    this.checkoutDetails = this.data.checkoutDetails;
    this.totalPrice = this.data.totalPrice;
  }

  ngOnInit(): void {}

  // INVOICE GENERATOR. from 'jspdf-invoice-template'
  generatePDF() {
    this.props = {
      returnJsPDFDocObject: true,
      fileName: 'Tomato Invoice',
      orientationLandscape: false,
      compress: true,
      logo: {
        src: 'assets/images/tomato-image.jpg',
        type: 'JPG',
        width: 30,
        height: 30,
        margin: {
          top: 0,
          left: 0,
        },
      },
      stamp: {
        inAllPages: true,
        src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
        type: 'JPG',
        width: 20,
        height: 20,
        margin: {
          top: 0,
          left: 0,
        },
      },
      business: {
        name: 'Tomato',
        address: 'Toma To, Central, Israel',
        phone: '(+972) 054 20 22 23 6',
        email: 'omribenshalom@gmail.com',
        website: 'www.tomato-online.co.il',
      },
      contact: {
        label: 'Invoice issued for:',
        name:
          store.getState().authState.user.firstName.toUpperCase() +
          ' ' +
          store.getState().authState.user.lastName.toUpperCase(),
        address:
          this.checkoutDetails.shippingStreet +
          ', ' +
          this.checkoutDetails.shippingCity,
        email: store.getState().authState.user.email,
      },
      invoice: {
        label: 'Invoice #: ',
        num: this.checkoutDetails.cart_id,
        invGenDate: 'Invoice Date: ' + this.now,
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: '#',
            style: {
              width: 10,
            },
          },
          {
            title: 'Title',
            style: {
              width: 50,
            },
          },
          { title: 'Price' },
          { title: 'Quantity' },
          { title: 'Total' },
        ],
        table: Array.from(this.cartItems, (item, index) => [
          index + 1,
          item.name,
          item.price.toFixed(2),
          item.quantity,
          (item.price * item.quantity).toFixed(2),
        ]),
        additionalRows: [
          {
            col1: 'Total:',
            col2: this.totalPrice.toFixed(2) + ' $',
            col3: 'ALL',
            style: {
              fontSize: 14,
            },
          },
        ],
        invDescLabel: "Tomato's Note",
        invDesc: `
        Thank you for purchasing with Tomato! Tomato is an online-market shopping app built as an angular project by Omri Ben Shalom. Tech used to build the app - Frontend: Angular , Redux, Angular material, HTML , CSS , JavaScript ,TypeScript. Backend: NodeJs , TypeScript , Express , RESTful API. DB: MongoDB , Mongoose
      `,
      },
      footer: {
        text: 'The invoice is fictional Tomato.',
      },
      pageEnable: true,
      pageLabel: 'Page ',
    };

    const pdfObject = jsPDFInvoiceTemplate(this.props);
  }
}
