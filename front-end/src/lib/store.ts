import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './hooks/products';  // Import the API slice
import { userAuthApi } from "./hooks/auth"
import { usersApi } from './hooks/user';

// Configure the store and add the API slice as middleware
export const store = configureStore({
  reducer: {
    // Add the API reducer to the store
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  // Add the API middleware for caching and other query features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, userAuthApi.middleware, usersApi.middleware),
});

// Types for dispatch and store state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
