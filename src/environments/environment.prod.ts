export const environment = {
  production: true,

  // https://tomatobackend-production.up.railway.app/

  //Auth URL's.
  preRegisterUrl:
    'https://tomatobackend-production.up.railway.app/api/auth/pre-register/',
  registerUrl: 'https://tomatobackend-production.up.railway.app/api/auth/register/',
  loginUrl: 'https://tomatobackend-production.up.railway.app/api/auth/login/',

  //Categories URL's.
  catgoriesUrl:
    'https://tomatobackend-production.up.railway.app/api/products/categories/',

  //Products URL's.
  productsUrl: 'https://tomatobackend-production.up.railway.app/api/products/',
  productsByCategoryUrl:
    'https://tomatobackend-production.up.railway.app/api/products/products-by-category/',
  productImageUrl:
    'https://tomatobackend-production.up.railway.app/api/products/images/',
  numberOfProductsUrl:
    'https://tomatobackend-production.up.railway.app/api/products/number-of-products/',
  productsSearchByPatternUrl:
    'https://tomatobackend-production.up.railway.app/api/products/products-search/',

  //Carts URL's.
  cartUrl: 'https://tomatobackend-production.up.railway.app/api/cart/',
  cartNewUrl: 'https://tomatobackend-production.up.railway.app/api/cart/new-cart/',
  cartItemsUrl:
    'https://tomatobackend-production.up.railway.app/api/cart/cart-items/',
  removeAllCartItemsUrl:
    'https://tomatobackend-production.up.railway.app/api/cart/cart-items/remove-all/',

  //Order URL.
  orderUrl: 'https://tomatobackend-production.up.railway.app/api/order/',
  orderCheckDateUrl:
    'https://tomatobackend-production.up.railway.app/api/order/check-date/',
  orderCitiesUrl: 'https://tomatobackend-production.up.railway.app/api/order/cities/',
  numberOfOrdersUrl:
    'https://tomatobackend-production.up.railway.app/api/order/number-of-orders/',
  lastOrderUrl:
    'https://tomatobackend-production.up.railway.app/api/order/last-order/',
};
