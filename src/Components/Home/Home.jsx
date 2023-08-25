import React, { useEffect } from "react";
import Header from "../Header/Header";
import Slider from "./Slider.jsx";
import { useDispatch, useSelector } from "react-redux";
import { startUiLoading, stopUiLoading } from "../../reducers/uiLoadingSlice";
import Loader from "../Loader";

const Home = () => {
  const dispatch = useDispatch();
  const isUiLoading = useSelector((state) => state.uiLoading.isUiLoading);

  useEffect(() => {
    // Simulate an API call
    dispatch(startUiLoading());
    setTimeout(() => {
      dispatch(stopUiLoading());
    }, 2000);
  }, [dispatch]);

  return (
    <>
      {isUiLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Slider />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
