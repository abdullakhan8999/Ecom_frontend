import { configureStore } from '@reduxjs/toolkit';
import uiLoadingReducer from './reducers/uiLoadingSlice.js';
import productsReducer from './reducers/productsSlice.js';
import newReviewReducer from './reducers/newReviewSlice.js';
import productReducer from './reducers/productSlice.js';
import userReducer from './reducers/userSlice.js';
import featuredProductsReducer from './reducers/featuredProductsSlice.js';
import searchCategoryReducer from './reducers/searchCategorySlice.js';
import cartReducer from './reducers/cartSlice.js';
import cartVisibilityReducer from "./reducers/cartVisibilitySlice.js";
import ordersReducer from "./reducers/ordersSlice.js";
import adminReducer from "./reducers/adminSlice.js";


const store = configureStore({
   reducer: {
      user: userReducer,
      uiLoading: uiLoadingReducer,
      products: productsReducer,
      product: productReducer,
      featuredProducts: featuredProductsReducer,
      searchCategory: searchCategoryReducer,
      cart: cartReducer,
      cartVisibility: cartVisibilityReducer,
      orders: ordersReducer,
      newReview: newReviewReducer,
      admin: adminReducer,
   },
});

export default store;
