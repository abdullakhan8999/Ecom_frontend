import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   featuredProducts: [],
   featuredCount: 0,
   featuredProductsLoading: false,
   error: null,
};

const featuredProductsSlice = createSlice({
   name: 'featuredProducts',
   initialState,
   reducers: {
      featuredProductsRequested: (state) => {
         state.featuredProductsLoading = true;
         state.error = null;
      },
      featuredProductsReceived: (state, action) => {
         state.featuredProductsLoading = false;
         state.featuredProducts = action.payload.products;
         state.featuredCount = action.payload.productsCount;
      },
      featuredProductsRequestFailed: (state, action) => {
         state.featuredProductsLoading = false;
         state.error = action.payload;
      },
   },
});

export const {
   featuredProductsRequested,
   featuredProductsReceived,
   featuredProductsRequestFailed,
} = featuredProductsSlice.actions;

export default featuredProductsSlice.reducer;
