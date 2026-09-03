import {
  configureStore,
} from '@reduxjs/toolkit';

import { catalogApi } from '../features/catalog/api/catalogApi';
import { ordersApi } from '../features/orders/api/ordersApi';

import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]:
      catalogApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      catalogApi.middleware,
      ordersApi.middleware
    ),
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;