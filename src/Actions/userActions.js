import axios from 'axios';
import {
   clearError,
   clearMessage,
   getUserInfoReceived,
   getUserInfoRequestFailed,
   getUserInfoRequested,
   passwordResetFailed,
   passwordResetRequested,
   passwordResetSuccess,
   userLoginReceived,
   userLoginRequestFailed,
   userLoginRequested,
   userLogoutFailed,
   userLogoutRequested,
   userLogoutSuccess,
   userPasswordChangeFailed,
   userPasswordChangeRequested,
   userPasswordChangeSuccess,
   userProfileUpdateFailed,
   userProfileUpdateRequested, userProfileUpdateSuccess, userSignUpReceived, userSignUpRequestFailed,
   userSignUpRequested,
   setNewPasswordRequested,
   setNewPasswordSuccess,
   setNewPasswordFailed,
} from '../reducers/userSlice';

let BASE_URL = 'https://ecomm-backend-5fix.onrender.com/api/v1';
// BASE_URL = "http://localhost:4000/api/v1";
// BASE_URL = "/api/v1";

// user logout
export const logoutUser = () => async (dispatch) => {
   try {
      dispatch(userLogoutRequested());

      await axios.get(BASE_URL + `/logout`);

      dispatch(userLogoutSuccess());
   } catch (error) {
      // console.log("Error while user logout user:", error);
      console.log("Error while user logout user:", error.response?.data?.message);
      dispatch(userLogoutFailed({ error: error.response.data.message || error }));
   }
};

// Register
export const register = (userData) => async (dispatch) => {
   try {
      dispatch(userSignUpRequested());

      const config = {
         headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(BASE_URL + `/register`, userData, config);

      const {
         status,
         user,
         token,
      } = data

      dispatch(userSignUpReceived({
         status,
         user,
         token,
      }));
   } catch (error) {
      // console.log("Error while Register user:", error);
      console.log("Error while Register user:", error.response?.data?.message);
      dispatch(userSignUpRequestFailed({ error: error.response.data.message }));
   }
};

//Clear all errors
export const clearUserErrors = () => async (dispatch) => {
   dispatch(clearError());
};

//Clear all Message
export const clearUserMessage = () => async (dispatch) => {
   dispatch(clearMessage());
};

// user Login
export const login = (email, password) => async (dispatch) => {
   try {
      dispatch(userLoginRequested());

      const config = {
         headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
         BASE_URL + `/login`,
         { email, password },
         config
      );
      const {
         status,
         user,
         token,
      } = data

      dispatch(userLoginReceived({
         status,
         user,
         token,
      }));

   } catch (error) {
      // console.log("Error while login user:", error);
      console.log("Error while login user:", error.response?.data?.message);
      dispatch(userLoginRequestFailed({ error: error.response.data.message }));
   }
};

//get user info
export const fetchUserInfo = () => async (dispatch) => {
   try {
      dispatch(getUserInfoRequested());

      const { data } = await axios.get(BASE_URL + `/me`);

      const { status, user, } = data;

      dispatch(getUserInfoReceived({ status, user }));
   } catch (error) {
      // console.log("Error while fetchUserInfo:", error);
      console.log("Error while fetchUserInfo:", error.response?.data?.message);
      dispatch(getUserInfoRequestFailed({ error: error.response.data.message }));
   }
};

// update User Profile
export const updateUserProfile = (updatedProfile) => async (dispatch) => {
   try {
      dispatch(userProfileUpdateRequested());

      // Make the API call to update the user profile
      const response = await axios.put(BASE_URL + `/me/update`, updatedProfile);

      dispatch(userProfileUpdateSuccess({ user: response.data.user }));
   } catch (error) {
      // console.log('Error while updating user profile:', error);
      console.log('Error message:', error.response?.data?.message);
      dispatch(userProfileUpdateFailed({ error: error.response.data.message || error }));
   }
};

// change User Password
export const changeUserPassword = (passwords) => async (dispatch) => {
   try {
      dispatch(userPasswordChangeRequested());

      await axios.put(BASE_URL + `/password/update`, passwords);

      dispatch(userPasswordChangeSuccess());
   } catch (error) {
      // console.log('Error while changing user password:', error);
      console.log('Error message:', error.response?.data?.message);
      dispatch(userPasswordChangeFailed({ error: error.response.data.message || error }));
   }
};

// forgot password
export const userForgotPassword = (email) => async (dispatch) => {
   try {
      dispatch(passwordResetRequested());

      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(BASE_URL + `/password/forgot`, { email }, config);
      const { message, resetUrl, status } = data;

      dispatch(passwordResetSuccess({ message, resetUrl, status }));

   } catch (error) {
      console.log('Error while Forgot password:', error);
      console.log('Error message:', error.response?.data?.message);
      dispatch(passwordResetFailed({ error: error.response.data.message || error }));
   }
};

// reset new password
export const resetNewPassword = (resetToken, passwordObj) => async (dispatch) => {
   try {
      dispatch(setNewPasswordRequested());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(BASE_URL + `/password/reset/${resetToken}`, passwordObj, config);

      const {
         status,
         user,
         token,
      } = data

      dispatch(setNewPasswordSuccess({
         status,
         user,
         token,
      }));

   } catch (error) {
      // console.log("Error while reset new password:", error);
      console.log("Error while reset new password:", error.response?.data?.message);
      dispatch(setNewPasswordFailed({ error: error.response.data.message }));
   }
};