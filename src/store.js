// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiLoadingReducer from './reducers/uiLoadingSlice.js';
import productsReducer from './reducers/productsSlice.js';
import productReducer from './reducers/productSlice.js';
import userReducer from './reducers/userSlice.js';
import featuredProductsReducer from './reducers/featuredProductsSlice.js';
import searchCategoryReducer from './reducers/searchCategorySlice.js';


const store = configureStore({
   reducer: {
      user: userReducer,
      uiLoading: uiLoadingReducer,
      products: productsReducer,
      product: productReducer,
      featuredProducts: featuredProductsReducer,
      searchCategory: searchCategoryReducer,
   },
});

export default store;
