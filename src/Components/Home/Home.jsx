import React from "react";
import Header from "./Components/Header/Header.jsx";
import Slider from "./Slider.jsx";
const Home = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Slider />
      </div>
    </>
  );
};

export default Home;
