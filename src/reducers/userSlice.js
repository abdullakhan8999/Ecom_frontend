import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: {},
   loadingUser: false,
   status: "",
   token: "",
   error: null,
   isAuthenticated: false,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userLoginRequested: (state) => {
         state.loadingUser = true;
         state.error = null;
      },
      userLoginReceived: (state, action) => {
         state.loadingUser = false;
         state.status = action.payload.status;
         state.user = action.payload.user;
         state.token = action.payload.token;
         state.isAuthenticated = true;
      },
      userLoginRequestFailed: (state, action) => {
         state.loadingUser = false;
         state.status = "failed";
         state.isAuthenticated = false;
         state.user = {};
         state.error = action.payload.error;
         state.token = "";
      },
      clearError: (state) => {
         state.error = null;
         state.status = "";
      },
      userSignUpRequested: (state) => {
         state.loadingUser = true;
         state.error = null;
      },
      userSignUpReceived: (state, action) => {
         state.loadingUser = false;
         state.status = action.payload.status;
         state.user = action.payload.user;
         state.token = action.payload.token;
         state.isAuthenticated = true;
      },
      userSignUpRequestFailed: (state, action) => {
         state.loadingUser = false;
         state.status = "failed";
         state.isAuthenticated = false;
         state.user = {};
         state.error = action.payload.error;
         state.token = "";
      },
      userLogoutRequested: (state) => {
         state.loadingUser = true;
         state.error = null;
      },
      userLogoutSuccess: (state) => {
         state.loadingUser = false;
         state.status = "logged_out";
         state.isAuthenticated = false;
         state.user = {};
         state.token = "";
      },
      userLogoutFailed: (state, action) => {
         state.loadingUser = false;
         state.status = "failed";
         state.error = action.payload.error;
      },
      getUserInfoRequested: (state) => {
         state.loadingUser = true;
         state.error = null;
      },
      getUserInfoReceived: (state, action) => {
         state.loadingUser = false;
         state.status = action.payload.status;
         state.user = action.payload.user;
         state.isAuthenticated = true;
      },
      getUserInfoRequestFailed: (state, action) => {
         state.loadingUser = false;
         state.status = "failed";
         state.error = action.payload.error;
      },
   },
});

export const {
   userLoginRequested,
   userLoginReceived,
   userLoginRequestFailed,
   clearError,
   userSignUpRequested,
   userSignUpReceived,
   userSignUpRequestFailed,
   userLogoutRequested,
   userLogoutSuccess,
   userLogoutFailed,
   getUserInfoRequested,
   getUserInfoReceived,
   getUserInfoRequestFailed,
} = userSlice.actions;

export default userSlice.reducer;
