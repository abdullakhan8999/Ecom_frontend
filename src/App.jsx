import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
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
import DashboardPage from "./Components/ProfilePage/DashboardPage.jsx";
import ResetPasswordPage from "./Components/ProfilePage/ResetPasswordPage.jsx";

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    ScrollToTop();
    dispatch(fetchUserInfo());
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
      <MetaData title={"MaNa-Ecomm-Store"} />
      <Header />
      <Routes>
        <Route exact path="/login" element={<LoginSignUpPage />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductsPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/orders" element={<OrdersPage />} />
        <Route exact path="/dashboard" element={<DashboardPage />} />
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
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
