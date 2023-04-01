import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import {
  addProductAction,
  deleteProductAction,
  fetchCategoriesAction,
  fetchProductsAction,
  ProductsAction,
  updateProductAction,
} from '../redux/products-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  public async getAllCategories(): Promise<CategoryModel[]> {
    const categories = await firstValueFrom(
      this.http.get<CategoryModel[]>(environment.catgoriesUrl)
    );

    const action: ProductsAction = fetchCategoriesAction(categories);
    store.dispatch(action);

    return categories;
  }

  // ------------------------------------

  public async getAllProducts(): Promise<ProductModel[]> {
    const products = await firstValueFrom(
      this.http.get<ProductModel[]>(environment.productsUrl)
    );
    const action: ProductsAction = fetchProductsAction(products);
    store.dispatch(action);

    return products;
  }

  // ------------------------------------

  public async getProductsByCategory(
    categoryId: string
  ): Promise<ProductModel[]> {
    const products = await firstValueFrom(
      this.http.get<ProductModel[]>(
        environment.productsByCategoryUrl + categoryId
      )
    );
    return products;
  }

  // ------------------------------------

  public async getProductsByPattern(pattern: string): Promise<ProductModel[]> {
    const products = await firstValueFrom(
      this.http.get<ProductModel[]>(
        environment.productsSearchByPatternUrl + pattern
      )
    );
    return products;
  }

  // ------------------------------------

  public async addProduct(product: ProductModel): Promise<ProductModel> {
    const formData = new FormData();

    console.log('addProduct . product - ', product);

    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('category_id', product.categoryId);
    formData.append('image', product.image);

    const addedProduct = await firstValueFrom(
      this.http.post<ProductModel>(environment.productsUrl, formData)
    );

    if (addedProduct) store.dispatch(addProductAction(addedProduct));

    return addedProduct;
  }

  // ------------------------------------

  public async updateProduct(product: ProductModel): Promise<ProductModel> {
    const formData = new FormData();

    console.log('updateProduct . product - ', product);

    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('category_id', product.categoryId);
    formData.append('image', product.image);

    console.log(environment.productsUrl + product._id);

    const updatedProduct = await firstValueFrom(
      this.http.put<ProductModel>(
        environment.productsUrl + product._id,
        formData
      )
    );

    if (updatedProduct) store.dispatch(updateProductAction(updatedProduct));

    return updatedProduct;
  }

  // ------------------------------------

  public async deleteProduct(_id: string): Promise<void> {
    const action: ProductsAction = deleteProductAction(_id);
    store.dispatch(action);

    await firstValueFrom(this.http.delete(environment.productsUrl + _id));
  }
}
