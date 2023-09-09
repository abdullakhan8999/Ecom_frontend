import axios from 'axios';
import {
   featuredProductsReceived,
   featuredProductsRequestFailed,
   featuredProductsRequested
} from '../reducers/featuredProductsSlice';
import {
   adminAllProductsFailed,
   adminAllProductsReceived,
   adminAllProductsRequested,
   clearError,
   productsReceived,
   productsRequestFailed,
   productsRequested
} from '../reducers/productsSlice';
import {
   productReceived,
   productRequestFailed,
   productRequested,
   productDeleteRequested,
   productDeleteSuccess,
   productDeleteRequestFailed,
   addNewProductRequested,
   addNewProductSuccess,
   addNewProductFailed,
   productUpdatedRequested,
   productUpdatedSuccess,
   productUpdatedFailed,
   clearError as ProductClearError,
} from '../reducers/productSlice';
import {
   clearNewReviewError,
   newReviewReceived,
   newReviewRequestFailed,
   newReviewRequested
} from '../reducers/newReviewSlice';


let BASE_URL = 'https://ecomm-backend-5fix.onrender.com/api/v1';
// BASE_URL = "http://localhost:4000/api/v1";
// BASE_URL = "/api/v1";


// get feature products 
export const fetchFeaturedProducts = () => async (dispatch) => {
   try {
      dispatch(featuredProductsRequested());

      const response = await axios.get(BASE_URL + `/featured/products`);
      const { products, productsCount } = response.data;
      dispatch(featuredProductsReceived({ products, productsCount }));
   } catch (error) {
      console.log(error);
      console.log("Error in fetch products:", error.response?.data?.message);
      dispatch(featuredProductsRequestFailed(error.response.data.message));
   }
};

// fetch Products By Category
export const fetchProductsByCategory = (category) => async (dispatch) => {
   try {
      dispatch(productsRequested());

      const response = await axios.get(`${BASE_URL}/products?category=${category}`);
      const { status,
         productsCount,
         products,
         resultPerPage,
         filteredProductsCount } = response.data;

      dispatch(productsReceived({
         status,
         productsCount,
         products,
         resultPerPage,
         filteredProductsCount
      }));
   } catch (error) {
      console.error("Error fetching products by category:", error.response?.data?.message);
      dispatch(productsRequestFailed(error.response.data.message));
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
      dispatch(productsRequestFailed(error.response.data.message));
   }
};

// get All products 
export const adminGetAllProducts = () => async (dispatch) => {
   try {
      dispatch(adminAllProductsRequested());

      let link = BASE_URL + `/admin/products`;
      const response = await axios.get(link);

      const {
         status,
         productsCount,
         products,
      } = response.data;
      dispatch(adminAllProductsReceived({
         status,
         productsCount,
         products,
      }));
   } catch (error) {
      console.log(error)
      console.log("Error in fetch products:", error.response?.data?.message);
      dispatch(adminAllProductsFailed(error.response.data.message));
   }
};

//Clear all errors
export const clearProductsErrors = () => async (dispatch) => {
   dispatch(clearError());
};

//Clear all errors
export const clearProductErrors = () => async (dispatch) => {
   dispatch(ProductClearError());
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
      dispatch(productRequestFailed(error.response.data.message));
   }
}

// new review
export const newReview = (reviewData) => async (dispatch) => {
   try {
      dispatch(newReviewRequested());
      const config = {
         headers: { "Content-Type": "application/json" },
         // withCredentials: true,
      };
      const response = await axios.put(BASE_URL + `/product/review`, reviewData, config);
      const { status } = response.data;

      dispatch(newReviewReceived({ success: status }));
   } catch (error) {
      console.log(error);
      console.log("Error in new review:", error.response?.data?.message);
      dispatch(newReviewRequestFailed({ error: error.response.data.message }));
      setTimeout(() => {
         dispatch(clearNewReviewError());
      }, 2000);
   }
}

// product delete
export const adminDeleteProduct = (id) => async (dispatch) => {
   try {
      dispatch(productDeleteRequested());

      const response = await axios.delete(BASE_URL + `/admin/product/${id}`);
      const { status, message } = response.data;

      dispatch(productDeleteSuccess({ status: message }));
   } catch (error) {
      console.log(error);
      console.log("Error while deleting product:", error.response?.data?.message);
      dispatch(productDeleteRequestFailed(error.response.data.message));
   }
}

// Add New Product
export const addNewProduct = (productData) => async (dispatch) => {
   try {
      dispatch(addNewProductRequested());

      const config = {
         headers: { "Content-Type": "application/json" },
         withCredentials: true,
      };

      const response = await axios.post(BASE_URL + `/admin/product/new`, productData, config);
      const { status, product } = response.data;
      dispatch(addNewProductSuccess({ status, product }));
   } catch (error) {
      console.log(error);
      console.log("Error while adding new product:", error.response?.data?.message);
      dispatch(addNewProductFailed({ error: error.response.data.message }));
   }
}

// Update Product
export const adminUpdateProduct = (id, productData) => async (dispatch) => {
   try {
      dispatch(productUpdatedRequested());

      const config = {
         headers: { "Content-Type": "application/json" },
         withCredentials: true,
      };

      await axios.put(BASE_URL + `/admin/product/${id}`, productData, config);
      dispatch(productUpdatedSuccess());
   } catch (error) {
      console.log(error);
      console.log("Error while updating product:", error.response?.data?.message);
      dispatch(productUpdatedFailed({ error: error.response.data.message }));
   }
}