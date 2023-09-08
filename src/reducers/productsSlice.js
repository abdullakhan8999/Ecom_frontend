import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   products: [],
   productsLoading: false,
   status: "",
   error: null,
   productsCount: 0,
   resultPerPage: 10,
   filteredProductsCount: 0,
};

const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      productsRequested: (state) => {
         state.productsLoading = true;
         state.error = null;
      },
      productsReceived: (state, action) => {
         state.productsLoading = false;
         state.status = action.payload.status;
         state.products = action.payload.products;
         state.productsCount = action.payload.productsCount;
         state.resultPerPage = action.payload.resultPerPage;
         state.filteredProductsCount = action.payload.filteredProductsCount;
      },
      productsRequestFailed: (state, action) => {
         state.productsLoading = false;
         state.error = action.payload;
      },
      clearError: (state, action) => {
         state.error = null;
         state.status = "";
      },
      adminAllProductsRequested: (state, action) => {
         state.productsLoading = true;
         state.error = null;
      },
      adminAllProductsReceived: (state, action) => {
         state.productsLoading = false;
         state.status = action.payload.status;
         state.products = action.payload.products;
         state.productsCount = action.payload.products.length;
         state.resultPerPage = 0;
         state.filteredProductsCount = 0;
      },
      adminAllProductsFailed: (state, action) => {
         state.productsLoading = false;
         state.error = action.payload.error;
      }
   },
});

export const {
   productsRequested,
   productsReceived,
   productsRequestFailed,
   adminAllProductsRequested,
   adminAllProductsReceived,
   adminAllProductsFailed,
   clearError
} = productsSlice.actions;

export default productsSlice.reducer;
