import { createSlice } from "@reduxjs/toolkit";

const cartVisibilitySlice = createSlice({
   name: "cartVisibility",
   initialState: {
      isVisible: false,
   },
   reducers: {
      toggleCart: (state) => {
         state.isVisible = !state.isVisible;
      },
   },
});

export const { toggleCart } = cartVisibilitySlice.actions;

export default cartVisibilitySlice.reducer;
