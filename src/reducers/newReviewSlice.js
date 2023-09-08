import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   newReviewLoading: false,
   success: false,
   error: null
};


const newReviewSlice = createSlice({
   name: 'newReview',
   initialState,
   reducers: {
      newReviewRequested: (state) => {
         state.newReviewLoading = true;
         state.error = null;
      },
      newReviewReceived: (state, action) => {
         state.newReviewLoading = false;
         state.success = action.payload.success;
      },
      newReviewRequestFailed: (state, action) => {
         state.newReviewLoading = false;
         state.error = action.payload.error;
      },
      newReviewRequestReset: (state, action) => {
         state.newReviewLoading = false;
         state.success = false;
      },
      clearNewReviewError: (state) => {
         state.error = null;
         state.success = false;
      }
   },
});

export const {
   newReviewRequested,
   newReviewReceived,
   newReviewRequestFailed,
   newReviewRequestReset,
   clearNewReviewError
} = newReviewSlice.actions;

export default newReviewSlice.reducer;
