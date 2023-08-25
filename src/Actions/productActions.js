import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { featuredProductsReceived, featuredProductsRequestFailed, featuredProductsRequested } from '../reducers/featuredProductsSlice';

let baseURL = 'https://ecomm-backend-5fix.onrender.com/api/v1';
// baseURL = "http://localhost:4000/api/v1";



export const fetchFeaturedProducts = () => async (dispatch) => {
   try {
      dispatch(featuredProductsRequested());

      const response = await axios.get(`${baseURL}/featured/products`);
      const { products, productsCount } = response.data;

      dispatch(featuredProductsReceived({ products, productsCount }));
   } catch (error) {
      console.log("Error in fetch products:", error.response?.data?.message);
      dispatch(featuredProductsRequestFailed(error.response?.data?.message
      ));
   }
};
