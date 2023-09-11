import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: {},
   loadingUser: false,
   status: "",
   token: "",
   resetUrl: "",
   message: "",
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
      clearMessage: (state) => {
         state.message = "";
         state.resetUrl = "";
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
      userProfileUpdateRequested: (state) => {
         state.loadingUser = true;
         state.error = null;
      },
      userProfileUpdateSuccess: (state, action) => {
         state.loadingUser = false;
         state.status = 'profile_updated';
         state.user = action.payload.user;
      },
      userProfileUpdateFailed: (state, action) => {
         state.loadingUser = false;
         state.status = 'failed';
         state.error = action.payload.error;
      },
      userPasswordChangeRequested: (state) => {
         state.loadingUser = true;
         state.error = null;
      },
      userPasswordChangeSuccess: (state) => {
         state.loadingUser = false;
         state.status = 'password_changed';
      },
      userPasswordChangeFailed: (state, action) => {
         state.loadingUser = false;
         state.status = 'failed';
         state.error = action.payload.error;
      },
      passwordResetRequested: (state) => {
         state.loadingUser = true;
         state.error = null;
      },
      passwordResetSuccess: (state, action) => {
         state.loadingUser = false;
         state.message = action.payload.message;
         state.status = action.payload.status;
         state.resetUrl = action.payload.resetUrl;
      },
      passwordResetFailed: (state, action) => {
         state.status = 'failed';
         state.error = action.payload.error;
      },
      setNewPasswordRequested: (state) => {
         state.loadingUser = true;
         state.error = null;
         state.loadingUser = false;
      },
      setNewPasswordSuccess: (state, action) => {
         state.loadingUser = false;
         state.status = action.payload.status;
         state.user = action.payload.user;
         state.token = action.payload.token;
         state.isAuthenticated = true;
      },
      setNewPasswordFailed: (state, action) => {
         state.loadingUser = false;
         state.status = "failed";
         state.isAuthenticated = false;
         state.user = {};
         state.error = action.payload.error;
         state.token = "";
      },
   },
});

export const {
   userLoginRequested,
   userLoginReceived,
   userLoginRequestFailed,
   clearError,
   clearMessage,
   userSignUpRequested,
   userSignUpReceived,
   userSignUpRequestFailed,
   userLogoutRequested,
   userLogoutSuccess,
   userLogoutFailed,
   getUserInfoRequested,
   getUserInfoReceived,
   getUserInfoRequestFailed,
   userProfileUpdateRequested,
   userProfileUpdateSuccess,
   userProfileUpdateFailed,
   userPasswordChangeRequested,
   userPasswordChangeSuccess,
   userPasswordChangeFailed,
   passwordResetRequested,
   passwordResetSuccess,
   passwordResetFailed,
   setNewPasswordRequested,
   setNewPasswordSuccess,
   setNewPasswordFailed,
} = userSlice.actions;

export default userSlice.reducer;
