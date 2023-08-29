import axios from 'axios';
import { featuredProductsReceived, featuredProductsRequestFailed, featuredProductsRequested } from '../reducers/featuredProductsSlice';
import { clearError, productsReceived, productsRequestFailed, productsRequested } from '../reducers/productsSlice';
import { productReceived, productRequestFailed, productRequested } from '../reducers/productSlice';

let BASE_URL = 'https://ecomm-backend-5fix.onrender.com/api/v1';
// BASE_URL = "http://localhost:4000/api/v1";
// BASE_URL = "/api/v1";


// get feature products 
export const fetchFeaturedProducts = () => async (dispatch) => {
   try {
      dispatch(featuredProductsRequested());

      console.log("BASE_URL", BASE_URL)
      const response = await axios.get(BASE_URL + `/featured/products`);
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
      let link = BASE_URL + `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
         link = BASE_URL + `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
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


// get product details
export const getProductDetails = (id) => async (dispatch) => {
   try {
      dispatch(productRequested());

      const response = await axios.get(BASE_URL + `/product/${id}`);
      const { product, status } = response.data;

      dispatch(productReceived({ product, status }));
   } catch (error) {
      console.log(error);
      console.log("Error in fetch product details:", error.response?.data?.message);
      dispatch(productRequestFailed(error.response?.data?.message));
   }
}