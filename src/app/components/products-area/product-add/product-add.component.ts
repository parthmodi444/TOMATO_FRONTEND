import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  public categories: CategoryModel[];
  public product = new ProductModel();
  public imageRef: File;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.categories = await this.productsService.getAllCategories();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async addProduct() {
    try {
      this.product.image = this.imageRef;

      const addedProduct = await this.productsService.addProduct(this.product);
      console.log('Product has been added - ', addedProduct);

      // this.router.navigateByUrl('/home');
    } catch (err: any) {
      alert(err.message);
    }
  }

  onFileChange(evt: any): void {
    this.imageRef = evt.target.files[0];
  }
}
