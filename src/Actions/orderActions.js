import axios from 'axios';
import {
   createOrderRequest,
   createOrderSuccess,
   createOrderFail,
   getOrdersRequest,
   getOrdersSuccess,
   getOrdersFail,
   getOrderDetailsRequest,
   getOrderDetailsSuccess,
   getOrderDetailsFail,
   clearErrors,
   UpdateOrderRequest,
   UpdateOrderSuccess,
   UpdateOrderFail,
   adminAllOrdersRequested,
   adminAllOrdersReceived,
   adminAllOrdersFailed,
   deleteOrderRequest,
   deleteOrderSuccess,
   deleteOrderFail,
} from '../reducers/ordersSlice';
import { getUserToken } from './userActions';
let BASE_URL = 'https://ecomm-backend-5fix.onrender.com/api/v1';
// BASE_URL = "http://localhost:4000/api/v1";
// BASE_URL = "/api/v1";


export const newOrder = (Order) => async (dispatch) => {

   try {
      dispatch(createOrderRequest());
      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(createOrderFail({ error: 'User not authenticated' }));
         return;
      }

      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      const { data } = await axios.post(BASE_URL + `/order/new`, Order, config);
      const { order } = data
      dispatch(createOrderSuccess({ order }));

   } catch (error) {
      console.log("Error while new order :", error);
      console.log("Error while new order :", error.response?.data?.message);
      dispatch(createOrderFail({ error: error.response.data.message }));
      setTimeout(() => {
         dispatch(clearErrors());
      }, 2000);
   }
}

export const getMyOrders = () => async (dispatch) => {
   try {
      dispatch(getOrdersRequest());
      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(getOrdersFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      const { data } = await axios.get(BASE_URL + `/orders/me`, config);
      const { orders } = data

      dispatch(getOrdersSuccess({ orders }));

   } catch (error) {
      console.log("Error while getting all orders :", error);
      console.log("Error while getting all orders :", error.response?.data?.message);
      dispatch(getOrdersFail({ error: error.response.data.message }));
      setTimeout(() => {
         dispatch(clearErrors());
      }, 2000);
   }
}

export const AdminGetAllOrders = () => async (dispatch) => {
   try {
      dispatch(adminAllOrdersRequested());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(adminAllOrdersFailed({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };


      const { data } = await axios.get(BASE_URL + `/admin/orders`, config);
      const {
         orders,
         totalAmount,
      } = data;

      dispatch(adminAllOrdersReceived({
         orders,
         totalAmount,
      }));

   } catch (error) {
      console.log("Error while getting all orders :", error);
      console.log("Error while getting all orders :", error.response?.data?.message);
      dispatch(adminAllOrdersFailed({ error: error.response.data.message }));
      setTimeout(() => {
         dispatch(clearErrors());
      }, 2000);
   }
}

export const getOrderDetails = (id) => async (dispatch) => {
   try {
      dispatch(getOrderDetailsRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(getOrderDetailsFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      const { data } = await axios.get(BASE_URL + `/order/${id}`, config);
      const { order } = data
      dispatch(getOrderDetailsSuccess({ order }));

   } catch (error) {
      console.log("Error while getting order details :", error);
      console.log("Error while getting order details :", error.response?.data?.message);
      dispatch(getOrderDetailsFail({ error: error.response.data.message }));
      setTimeout(() => {
         dispatch(clearErrors());
      }, 2000);
   }
}

export const updateOrder = (id, Order) => async (dispatch) => {

   try {
      dispatch(UpdateOrderRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(UpdateOrderFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      await axios.put(BASE_URL + `/admin/order/${id}`, Order, config);

      dispatch(UpdateOrderSuccess());

   } catch (error) {
      console.log("Error while new order :", error);
      console.log("Error while new order :", error.response?.data?.message);
      dispatch(UpdateOrderFail({ error: error.response.data.message }));
      setTimeout(() => {
         dispatch(clearUserErrors());
      }, 2000);
   }
}

export const deleteOrder = (id) => async (dispatch) => {

   try {
      dispatch(deleteOrderRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(deleteOrderFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      await axios.delete(BASE_URL + `/admin/order/${id}`, config);

      dispatch(deleteOrderSuccess());

   } catch (error) {
      console.log("Error while new order :", error);
      console.log("Error while new order :", error.response?.data?.message);
      dispatch(deleteOrderFail({ error: error.response.data.message }));
   }
}

//Clear all errors
export const clearUserErrors = () => async (dispatch) => {
   dispatch(clearErrors());
};