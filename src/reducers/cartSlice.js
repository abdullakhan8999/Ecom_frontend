import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
   name: 'cart',
   initialState: {
      cartItems:
         localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
      shippingInfo: localStorage.getItem("shippingInfo") ?
         JSON.parse(localStorage.getItem("shippingInfo")) : {}
   },
   reducers: {
      addToCart: (state, action) => {
         const newItem = action.payload.item;
         const existingItem = state.cartItems.find(item => item.product === newItem.product);
         if (existingItem) {
            state.cartItems = state.cartItems.map(item =>
               item.product === existingItem.product ? newItem : item
            )
         } else {
            state.cartItems.push(newItem);
         }
      },
      removeFromCart: (state, action) => {
         const itemIdToRemove = action.payload.product;
         state.cartItems = state.cartItems.filter(item => item.product !== itemIdToRemove);
         localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
      saveShippingInfo: (state, action) => {
         state.shippingInfo = action.payload.data;
      }
   },
});

export const { saveShippingInfo, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
