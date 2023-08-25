import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<LoginSignUpPage />} /> */}
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
