import axios from 'axios';
let BASE_URL = 'https://ecomm-backend-5fix.onrender.com/api/v1';
// BASE_URL = "http://localhost:4000/api/v1";
// BASE_URL = "/api/v1";
import { addToCart, saveShippingInfo } from '../reducers/cartSlice';


export const addProductToCart = (id, quantity) => async (dispatch, getState) => {
   try {
      const { data } = await axios.get(BASE_URL + `/product/${id}`);
      const { product } = data;

      const item = {
         product: product._id,
         name: product.name,
         price: product.price,
         image: product.images[0].url,
         stock: product.stock,
         quantity,
      };

      // Adding to cart
      dispatch(addToCart({ item }));
      // Store in local storage
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
   } catch (error) {
      console.log("Error while adding product to cart: ", error);
   }
}

export const saveShippingDetails = (data) => async (dispatch) => {
   try {
      dispatch(saveShippingInfo({ data }))
      localStorage.setItem('shippingInfo', JSON.stringify(data));
   } catch (error) {
      console.log("Error while saving shipping details: ", error);
   }
};

