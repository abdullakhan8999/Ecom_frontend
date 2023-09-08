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
         state.error = action.payload.error;
      },
      productDeleteRequested: (state) => {
         state.productLoading = true;
         state.error = null;
      },
      productDeleteSuccess: (state, action) => {
         state.productLoading = false;
         state.status = "successfully deleted";
         state.product = {};
      },
      productDeleteRequestFailed: (state, action) => {
         state.productLoading = false;
         state.error = action.payload.error;
      },
      productUpdatedRequested: (state) => {
         state.productLoading = true;
         state.error = null;
      },
      productUpdatedSuccess: (state, action) => {
         state.productLoading = false;
         state.status = "successfully Updated";
      },
      productUpdatedFailed: (state, action) => {
         state.productLoading = false;
         state.error = action.payload.error;
      },
      addNewProductRequested: (state) => {
         state.productLoading = true;
         state.error = null;
      },
      addNewProductSuccess: (state, action) => {
         state.productLoading = false;
         state.status = "new Product Added";
         state.product = action.payload.product;
      },
      addNewProductFailed: (state, action) => {
         state.productLoading = false;
         state.error = action.payload.error;
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
   productDeleteRequested,
   productDeleteSuccess,
   productDeleteRequestFailed,
   addNewProductRequested,
   addNewProductSuccess,
   addNewProductFailed,
   productUpdatedRequested,
   productUpdatedSuccess,
   productUpdatedFailed,
   clearError
} = productSlice.actions;

export default productSlice.reducer;
