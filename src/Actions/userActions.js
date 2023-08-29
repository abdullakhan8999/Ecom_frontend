import axios from 'axios';
import { clearError, getUserInfoReceived, getUserInfoRequestFailed, getUserInfoRequested, userLoginReceived, userLoginRequestFailed, userLoginRequested, userLogoutFailed, userLogoutRequested, userLogoutSuccess, userSignUpReceived, userSignUpRequestFailed, userSignUpRequested } from '../reducers/userSlice';

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
      console.log("Error while user logout user:", error);
      console.log("Error while user logout user:", error.response?.data?.message);
      dispatch(userLogoutFailed({ error: error.response.data.message || error }));
   }
};

// Register
export const register = (userData) => async (dispatch) => {
   try {
      dispatch(userSignUpRequested());

      const config = { headers: { "Content-Type": "application/json" } };
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
      console.log("Error while Register user:", error);
      console.log("Error while Register user:", error.response?.data?.message);
      dispatch(userSignUpRequestFailed({ error: error.response.data.message || error }));
   }
};


//Clear all errors
export const clearUserErrors = () => async (dispatch) => {
   dispatch(clearError());
};


// user Login
export const login = (email, password) => async (dispatch) => {
   try {
      dispatch(userLoginRequested());

      const config = { headers: { "Content-Type": "application/json" } };

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
      console.log("Error while fetchUserInfo:", error);
      console.log("Error while fetchUserInfo:", error.response?.data?.message);
      dispatch(getUserInfoRequestFailed({ error: error.response.data.message || error }));
   }
};
