import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { featuredProductsReceived, featuredProductsRequestFailed, featuredProductsRequested } from '../reducers/featuredProductsSlice';
import { clearError, productsReceived, productsRequestFailed, productsRequested } from '../reducers/productsSlice';

let BASE_URL = 'https://ecomm-backend-5fix.onrender.com';
// BASE_URL = "http://localhost:4000";



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
export const fetchAllProducts = (keyword = "", currentPage = 1, price = [0, 250000], category, ratings = 0) => async (dispatch) => {
   try {
      dispatch(productsRequested());
      let link = BASE_URL + `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
         link = BASE_URL + `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const response = await axios.get(link);
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


//Clear all errors
export const clearProductsErrors = () => async (dispatch) => {
   dispatch(clearError());
};