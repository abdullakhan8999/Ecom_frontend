import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import AboutUsPage from "./Components/AboutUsPage.jsx";
import ContactPage from "./Components/contactPage.jsx";
import ProductsPage from "./Components/ProductsComponents/ProductsPage.jsx";
import ProductDetailsPage from "./Components/ProductsComponents/ProductDetailsPage.jsx";
import Footer from "./Components/Footer.jsx";
import ScrollToTop from "./Components/common/ScrollToTop.js";
import MetaData from "./Components/common/MetaData.jsx";
import LoginSignUpPage from "./Components/LoginSignUpPage/LoginSignUpPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "./Actions/userActions.js";
import { clearError } from "./reducers/userSlice.js";
import Header from "./Components/Header/Header.jsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage.jsx";
import OrdersPage from "./Components/ProfilePage/OrdersPage.jsx";
import DashboardPage from "./Components/ProfilePage/DashboardPage/DashboardPage.jsx";
import UserDetailsPage from "./Components/ProfilePage/DashboardPage/UserDetailsPage.jsx";
import ResetPasswordPage from "./Components/ProfilePage/ResetPasswordPage.jsx";
import CartPage from "./Components/CartPage/CartPage.jsx";
import ShippingPage from "./Components/CartPage/ShippingPage.jsx";
import ConfirmOrderPage from "./Components/CartPage/ConfirmOrderPage.jsx";
import PaymentPage from "./Components/CartPage/PaymentPage.jsx";
import OrderSuccessPage from "./Components/CartPage/OrderSuccessPage.jsx";
import OrderDetailsPage from "./Components/CartPage/OrderDetailsPage.jsx";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NotFound from "./Components/common/NotFound.jsx";

const App = () => {
  const dispatch = useDispatch();
  let BASE_URL = "https://ecomm-backend-5fix.onrender.com/api/v1";
  // BASE_URL = "/api/v1";
  const error = useSelector((state) => state.user.error);
  const isVisible = useSelector((state) => state.cartVisibility.isVisible);
  const [stripeApiKey, setStripeApiKey] = useState(null);

  const getStripeApiKey = async () => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        BASE_URL + "/send_stripe_api_key",
        config
      );
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    ScrollToTop();
    dispatch(fetchUserInfo());
    getStripeApiKey();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 2000);
    }
  }, [error]);

  return (
    <Router>
      <MetaData title={"MaNa Ecomm"} />
      <Header />
      {isVisible && <CartPage />}
      <Routes>
        <Route exact path="/login" element={<LoginSignUpPage />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductsPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/admin/user/:id" element={<UserDetailsPage />} />
        <Route exact path="/orders" element={<OrdersPage />} />
        <Route exact path="/about" element={<AboutUsPage />} />
        <Route exact path="/contact" element={<ContactPage />} />
        <Route exact path="/order/:id" element={<OrderDetailsPage />} />
        <Route exact path="/order_confirm" element={<ConfirmOrderPage />} />
        <Route exact path="/dashboard" element={<DashboardPage />} />
        <Route exact path="/shipping" element={<ShippingPage />} />
        <Route exact path="/success" element={<OrderSuccessPage />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPasswordPage />}
        />
        <Route
          exact
          path="/product/:idProduct"
          element={<ProductDetailsPage />}
        />
        {stripeApiKey && (
          <Route
            exact
            path="/process/payment"
            element={
              <>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <PaymentPage />
                </Elements>
              </>
            }
          />
        )}
        <Route
          path={window.location.pathname === "/process/payment" ? "" : "*"}
          element={<NotFound />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
