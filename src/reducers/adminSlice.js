import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
   name: "admin",
   initialState: {
      adminLoading: false,
      admin: {},
      users: {},
      status: "",
      ratings: 0,
      reviews: {},
      user: [],
      error: null,
   },
   reducers: {
      getAllUsersRequest: (state) => {
         state.adminLoading = true;
      },
      getAllUsersSuccess: (state, action) => {
         state.adminLoading = false;
         state.users = action.payload.users;
      },
      getAllUsersFail: (state, action) => {
         state.adminLoading = false;
         state.error = action.payload.error;
      },
      usersDetailsRequest: (state) => {
         state.adminLoading = true;
         state.user = {};
      },
      usersDetailsSuccess: (state, action) => {
         state.adminLoading = false;
         state.user = action.payload.user;
      },
      usersDetailsFail: (state, action) => {
         state.adminLoading = false;
         state.error = action.payload.error;
      },
      UpdateUserRoleRequest: (state) => {
         state.adminLoading = true;
         state.status = "";
      },
      UpdateUserRoleSuccess: (state,) => {
         state.adminLoading = false;
         state.status = "User role updated successfully";
      },
      UpdateUserRoleFail: (state, action) => {
         state.adminLoading = false;
         state.error = action.payload.error;
      },
      deleteUserRequest: (state) => {
         state.adminLoading = true;
         state.user = {};
         state.status = "";
      },
      deleteUserSuccess: (state, action) => {
         state.adminLoading = false;
         state.status = `User deleted successfully!`;
      },
      deleteUserFail: (state, action) => {
         state.adminLoading = false;
         state.error = action.payload.error;
      },
      getAllReviewsRequest: (state) => {
         state.adminLoading = true;
         state.ratings = 0;
         state.reviews = {};
      },
      getAllReviewsSuccess: (state, action) => {
         state.adminLoading = false;
         state.ratings = action.payload.ratings;
         state.reviews = action.payload.reviews;
      },
      getAllReviewsFail: (state, action) => {
         state.adminLoading = false;
         state.error = action.payload.error;
      },
      deleteReviewRequest: (state) => {
         state.adminLoading = true;
         state.status = "";
      },
      deleteReviewSuccess: (state) => {
         state.adminLoading = false;
         state.status = "Review deleted successfully";
      },
      deleteReviewFail: (state, action) => {
         state.adminLoading = false;
         state.error = action.payload.error;
      },
      clearErrors: (state) => {
         state.error = null;
         state.status = "";
      },
   },
});

export const {
   getAllUsersRequest,
   getAllUsersSuccess,
   getAllUsersFail,
   usersDetailsRequest,
   usersDetailsSuccess,
   usersDetailsFail,
   UpdateUserRoleRequest,
   UpdateUserRoleSuccess,
   UpdateUserRoleFail,
   deleteUserRequest,
   deleteUserSuccess,
   deleteUserFail,
   clearErrors,
   getAllReviewsRequest,
   getAllReviewsSuccess,
   getAllReviewsFail,
   deleteReviewRequest,
   deleteReviewSuccess,
   deleteReviewFail,
} = adminSlice.actions;

export default adminSlice.reducer;
