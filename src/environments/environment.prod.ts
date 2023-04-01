export const environment = {
  production: true,

  // https://online-shop-by-omri.herokuapp.com/

  //Auth URL's.
  preRegisterUrl:
    'https://online-shop-by-omri.herokuapp.com/api/auth/pre-register/',
  registerUrl: 'https://online-shop-by-omri.herokuapp.com/api/auth/register/',
  loginUrl: 'https://online-shop-by-omri.herokuapp.com/api/auth/login/',

  //Categories URL's.
  catgoriesUrl:
    'https://online-shop-by-omri.herokuapp.com/api/products/categories/',

  //Products URL's.
  productsUrl: 'https://online-shop-by-omri.herokuapp.com/api/products/',
  productsByCategoryUrl:
    'https://online-shop-by-omri.herokuapp.com/api/products/products-by-category/',
  productImageUrl:
    'https://online-shop-by-omri.herokuapp.com/api/products/images/',
  numberOfProductsUrl:
    'https://online-shop-by-omri.herokuapp.com/api/products/number-of-products/',
  productsSearchByPatternUrl:
    'https://online-shop-by-omri.herokuapp.com/api/products/products-search/',

  //Carts URL's.
  cartUrl: 'https://online-shop-by-omri.herokuapp.com/api/cart/',
  cartNewUrl: 'https://online-shop-by-omri.herokuapp.com/api/cart/new-cart/',
  cartItemsUrl:
    'https://online-shop-by-omri.herokuapp.com/api/cart/cart-items/',
  removeAllCartItemsUrl:
    'https://online-shop-by-omri.herokuapp.com/api/cart/cart-items/remove-all/',

  //Order URL.
  orderUrl: 'https://online-shop-by-omri.herokuapp.com/api/order/',
  orderCheckDateUrl:
    'https://online-shop-by-omri.herokuapp.com/api/order/check-date/',
  orderCitiesUrl: 'https://online-shop-by-omri.herokuapp.com/api/order/cities/',
  numberOfOrdersUrl:
    'https://online-shop-by-omri.herokuapp.com/api/order/number-of-orders/',
  lastOrderUrl:
    'https://online-shop-by-omri.herokuapp.com/api/order/last-order/',
};
