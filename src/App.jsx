import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import ProductsPage from "./Components/ProductsComponents/ProductsPage.jsx";
import Footer from "./Components/Footer.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<LoginSignUpPage />} /> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
