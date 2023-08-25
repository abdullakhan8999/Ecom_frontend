// src/reducers/uiLoadingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isUiLoading: false,
};

const uiLoadingSlice = createSlice({
   name: 'uiLoading',
   initialState,
   reducers: {
      startUiLoading: (state) => {
         state.isUiLoading = true;
      },
      stopUiLoading: (state) => {
         state.isUiLoading = false;
      },
   },
});

export const { startUiLoading, stopUiLoading } = uiLoadingSlice.actions;

export default uiLoadingSlice.reducer;
