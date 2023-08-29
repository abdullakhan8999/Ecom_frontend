import { createSlice } from '@reduxjs/toolkit';

const searchCategorySlice = createSlice({
   name: 'searchCategory',
   initialState: null,
   reducers: {
      setSearchCategory: (state, action) => action.payload,
   },
});

export const { setSearchCategory } = searchCategorySlice.actions;

export default searchCategorySlice.reducer;
