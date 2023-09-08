import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
   name: "orders",
   initialState: {
      orderLoading: false,
      order: {},
      orders: [],
      status: "",
      totalAmount: "",
      error: null,
   },
   reducers: {
      createOrderRequest: (state) => {
         state.orderLoading = true;
      },
      createOrderSuccess: (state, action) => {
         state.orderLoading = false;
         state.order = action.payload.order;
      },
      createOrderFail: (state, action) => {
         state.orderLoading = false;
         state.error = action.payload.error;
      },
      getOrdersRequest: (state) => {
         state.orderLoading = true;
      },
      getOrdersSuccess: (state, action) => {
         state.orderLoading = false;
         state.orders = action.payload.orders;
      },
      getOrdersFail: (state, action) => {
         state.orderLoading = false;
         state.error = action.payload.error;
      },
      getOrderDetailsRequest: (state) => {
         state.orderLoading = true;
         state.order = {};
      },
      getOrderDetailsSuccess: (state, action) => {
         state.orderLoading = false;
         state.order = action.payload.order;
      },
      getOrderDetailsFail: (state, action) => {
         state.orderLoading = false;
         state.error = action.payload.error;
      },
      UpdateOrderRequest: (state) => {
         state.orderLoading = true;
      },
      UpdateOrderSuccess: (state) => {
         state.orderLoading = false;
         state.status = "Order Updated Successfully";
      },
      UpdateOrderFail: (state, action) => {
         state.orderLoading = false;
         state.error = action.payload.error;
      },
      deleteOrderRequest: (state) => {
         state.orderLoading = true;
      },
      deleteOrderSuccess: (state) => {
         state.orderLoading = false;
         state.status = "Order deleted Successfully";
      },
      deleteOrderFail: (state, action) => {
         state.orderLoading = false;
         state.error = action.payload.error;
      },
      adminAllOrdersRequested: (state) => {
         state.orderLoading = true;
      },
      adminAllOrdersReceived: (state, action) => {
         state.orderLoading = false;
         state.orders = action.payload.orders;
         state.totalAmount = action.payload.totalAmount;
      },
      adminAllOrdersFailed: (state, action) => {
         state.orderLoading = false;
         state.error = action.payload.error;
      },
      clearErrors: (state) => {
         state.error = null;
         state.status = "";
      },
   },
});

export const {
   createOrderRequest,
   createOrderSuccess,
   createOrderFail,
   getOrdersRequest,
   getOrdersSuccess,
   getOrdersFail,
   getOrderDetailsRequest,
   getOrderDetailsSuccess,
   getOrderDetailsFail,
   adminAllOrdersRequested,
   adminAllOrdersReceived,
   adminAllOrdersFailed,
   UpdateOrderRequest,
   UpdateOrderSuccess,
   UpdateOrderFail,
   deleteOrderRequest,
   deleteOrderSuccess,
   deleteOrderFail,
   clearErrors,
} = ordersSlice.actions;

export default ordersSlice.reducer;
