// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiLoadingReducer from './reducers/uiLoadingSlice.js';

const store = configureStore({
   reducer: {
      uiLoading: uiLoadingReducer,
   },
});

export default store;
