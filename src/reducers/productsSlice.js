import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   products: [],
   productsLoading: false,
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
         state.products = action.payload.products;
         state.productsCount = action.payload.productsCount;
         state.filteredProductsCount = action.payload.filteredProductsCount;
      },
      productsRequestFailed: (state, action) => {
         state.productsLoading = false;
         state.error = action.payload;
      },
   },
});

export const {
   productsRequested,
   productsReceived,
   productsRequestFailed,
} = productsSlice.actions;

export default productsSlice.reducer;
