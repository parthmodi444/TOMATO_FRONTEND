import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';

export class ProductsState {
  public products: ProductModel[] = [];
  public categories: CategoryModel[] = [];
}

export enum ProductsActionType {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  ADD_PRODUCT = 'ADD_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

export interface ProductsAction {
  type: ProductsActionType;
  payload: any;
}

export function fetchCategoriesAction(
  categories: CategoryModel[]
): ProductsAction {
  return { type: ProductsActionType.FETCH_CATEGORIES, payload: categories };
}
export function fetchProductsAction(products: ProductModel[]): ProductsAction {
  return { type: ProductsActionType.FETCH_PRODUCTS, payload: products };
}
export function addProductAction(product: ProductModel): ProductsAction {
  return { type: ProductsActionType.ADD_PRODUCT, payload: product };
}
export function updateProductAction(product: ProductModel): ProductsAction {
  return { type: ProductsActionType.UPDATE_PRODUCT, payload: product };
}
export function deleteProductAction(_id: string): ProductsAction {
  return { type: ProductsActionType.DELETE_PRODUCT, payload: _id };
}

export function productsReducer(
  currentState = new ProductsState(),
  action: ProductsAction
): ProductsState {
  const newState = { ...currentState };

  switch (action.type) {
    case ProductsActionType.FETCH_CATEGORIES:
      newState.categories = action.payload;
      break;

    case ProductsActionType.FETCH_PRODUCTS:
      newState.products = action.payload;
      break;

    case ProductsActionType.ADD_PRODUCT:
      newState.products.push(action.payload);
      break;

    case ProductsActionType.UPDATE_PRODUCT:
      const indexToUpdate = newState.products.findIndex(
        (p) => p._id === action.payload.id
      );
      if (indexToUpdate >= 0) {
        newState.products[indexToUpdate] = action.payload;
      }
      break;

    case ProductsActionType.DELETE_PRODUCT:
      const indexToDelete = newState.products.findIndex(
        (p) => p._id === action.payload
      );
      if (indexToDelete >= 0) {
        newState.products.splice(indexToDelete, 1);
      }
      break;
  }

  return newState;
}
