import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { featuredProductsReceived, featuredProductsRequestFailed, featuredProductsRequested } from '../reducers/featuredProductsSlice';
import { productsReceived, productsRequestFailed, productsRequested } from '../reducers/productsSlice';

let BASE_URL = 'https://ecomm-backend-5fix.onrender.com';
// baseURL = "http://localhost:4000/api/v1";



// get feature products 
export const fetchFeaturedProducts = () => async (dispatch) => {
   try {
      dispatch(featuredProductsRequested());

      const response = await axios.get(BASE_URL + `/api/v1/featured/products`);
      const { products, productsCount } = response.data;

      dispatch(featuredProductsReceived({ products, productsCount }));
   } catch (error) {
      console.log(error);
      console.log("Error in fetch products:", error.response?.data?.message);
      dispatch(featuredProductsRequestFailed(error.response?.data?.message));
   }
};




// get All products 
export const fetchAllProducts = () => async (dispatch) => {
   try {
      dispatch(productsRequested());

      const response = await axios.get(BASE_URL + `/api/v1/products`);
      const {
         status,
         productsCount,
         products,
         resultPerPage,
         filteredProductsCount
      } = response.data;
      dispatch(productsReceived({
         status,
         productsCount,
         products,
         resultPerPage,
         filteredProductsCount,
      }));
   } catch (error) {
      console.log("Error in fetch products:", error.response?.data?.message);
      dispatch(productsRequestFailed(error.response?.data?.message));
   }
};
