import axios from 'axios';
import {
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
   getAllReviewsRequest,
   getAllReviewsSuccess,
   getAllReviewsFail,
   deleteReviewRequest,
   deleteReviewSuccess,
   deleteReviewFail,
   clearErrors,
} from '../reducers/adminSlice';
import { getUserToken } from './userActions';
let BASE_URL = 'https://ecomm-backend-5fix.onrender.com/api/v1';
// BASE_URL = "http://localhost:4000/api/v1";
// BASE_URL = "/api/v1";

//get all users
export const adminGetAllUsers = () => async (dispatch) => {
   try {
      dispatch(getAllUsersRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(getAllUsersFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      const { data } = await axios.get(BASE_URL + `/admin/users`, config);

      const { status, users } = data;

      dispatch(getAllUsersSuccess({ status, users }));
   } catch (error) {
      // console.log("Error while GetAllUsers:", error);
      console.log("Error while GetAllUsers:", error.response?.data?.message);
      dispatch(getAllUsersFail({ error: error.response.data.message }));
   }
};

//get  user details
export const adminGetUserDetails = (id) => async (dispatch) => {
   try {
      dispatch(usersDetailsRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(usersDetailsFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      const { data } = await axios.get(BASE_URL + `/admin/user/${id}`, config);

      const { user } = data;

      dispatch(usersDetailsSuccess({ user }));
   } catch (error) {
      // console.log("Error while get user details:", error);
      console.log("Error while get user details:", error.response?.data?.message);
      dispatch(usersDetailsFail({ error: error.response.data.message }));
   }
};

//admin Update User Role
export const adminUpdateUserRole = (id, updateDetails) => async (dispatch) => {
   try {
      dispatch(UpdateUserRoleRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(UpdateUserRoleFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      await axios.put(BASE_URL + `/admin/user/${id}`, updateDetails, config);

      dispatch(UpdateUserRoleSuccess());
   } catch (error) {
      console.log("Error while admin Update User Role:", error);
      console.log("Error while admin Update User Role:", error.response?.data?.message);
      dispatch(UpdateUserRoleFail({ error: error.response.data.message }));
   }
};

//admin delete User 
export const adminDeleteUser = (id) => async (dispatch) => {
   try {
      dispatch(deleteUserRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(deleteUserFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      await axios.delete(BASE_URL + `/admin/user/${id}`, config);

      dispatch(deleteUserSuccess());
   } catch (error) {
      // console.log("Error while admin delete User:", error);
      console.log("Error while admin delete User:", error.response?.data?.message);
      dispatch(deleteUserFail({ error: error.response.data.message }));
   }
};

// Action to get all reviews
export const getAllReviews = (productId) => async (dispatch) => {
   try {
      dispatch(getAllReviewsRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(getAllReviewsFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      const { data } = await axios.get(BASE_URL + `/review?id=${productId}`, config);
      const { ratings, reviews } = data;

      dispatch(getAllReviewsSuccess({ ratings, reviews }));
   } catch (error) {
      console.log("Error", error);
      console.log("Error", error.response.data.message);
      dispatch(getAllReviewsFail({ error: error.response.data.message }));
   }
};

// Action to delete a review
export const deleteReview = (productId, reviewId) => async (dispatch) => {
   try {
      dispatch(deleteReviewRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(deleteReviewFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      await axios.delete(BASE_URL + `/review?productId=${productId}&id=${reviewId}`, config);
      dispatch(deleteReviewSuccess());
   } catch (error) {
      console.log("Error", error);
      dispatch(deleteReviewFail({ error: error.response.data.message }));
   }
};


//Clear all errors
export const clearUserErrors = () => async (dispatch) => {
   dispatch(clearErrors());
};