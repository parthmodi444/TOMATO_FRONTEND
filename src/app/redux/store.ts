import { combineReducers, createStore } from 'redux';
import { authReducer } from './auth-state';
import { productsReducer } from './products-state';
import { composeWithDevTools } from '@redux-devtools/extension';
import { cartReducer } from './cart-state';
import { cartItemsReducer } from './cart-items-state';

// Creating reducers object from all our reducers:
const reducers = combineReducers({
  productsState: productsReducer,
  authState: authReducer,
  cartState: cartReducer,
  cartItemsState: cartItemsReducer,
});

// The most important Redux object:
const store = createStore(reducers, composeWithDevTools());

export default store;
