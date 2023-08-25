// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiLoadingReducer from './reducers/uiLoadingSlice.js';
import productsReducer from './reducers/productsSlice.js';
import featuredProductsReducer from './reducers/featuredProductsSlice.js';


const store = configureStore({
   reducer: {
      uiLoading: uiLoadingReducer,
      products: productsReducer,
      featuredProducts: featuredProductsReducer,
   },
});

export default store;
