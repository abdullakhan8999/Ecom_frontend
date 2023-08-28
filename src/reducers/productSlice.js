import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   product: {},
   productLoading: false,
   status: "",
   error: null,
};

const productSlice = createSlice({
   name: 'product',
   initialState,
   reducers: {
      productRequested: (state) => {
         state.productLoading = true;
         state.error = null;
      },
      productReceived: (state, action) => {
         state.productLoading = false;
         state.status = action.payload.status;
         state.product = action.payload.product;
      },
      productRequestFailed: (state, action) => {
         state.productLoading = false;
         state.error = action.payload;
      },
      clearError: (state) => {
         state.error = null;
         state.status = "";
      }
   },
});

export const {
   productRequested,
   productReceived,
   productRequestFailed,
   clearError
} = productSlice.actions;

export default productSlice.reducer;
