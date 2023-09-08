import React, { useEffect } from "react";
import Slider from "./Slider.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
import Categories from "./Categories.jsx";
import { useDispatch, useSelector } from "react-redux";
import { startUiLoading, stopUiLoading } from "../../reducers/uiLoadingSlice";
import Loader from "../Loader";
import NewsletterSubscription from "../common/NewsletterSubscription";
import ScrollToTop from "../common/ScrollToTop";
import TakeToTop from "../common/TakeToTop";
import MetaData from "../common/MetaData";

const Home = () => {
  const dispatch = useDispatch();
  const isUiLoading = useSelector((state) => state.uiLoading.isUiLoading);

  // Scroll to top
  useEffect(() => {
    ScrollToTop();
  }, []);

  // Loading products
  useEffect(() => {
    dispatch(startUiLoading());
    setTimeout(() => {
      dispatch(stopUiLoading());
    }, 2000);
  }, []);

  return (
    <>
      {isUiLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"MaNa Ecomm"} />
          <div className="max-w-screen-xl z-20 relative flex flex-wrap items-center justify-between mx-auto p-4">
            <Slider />
            <div className="w-full py-5  bg-white my-4 flex flex-col items-center justify-center">
              <p className="text-gray-600 md:text-2xl font-medium">
                Explore Featured Products
              </p>
              <p className="text-gray-500 text-center text-sm md:text-lg font-medium">
                Shop the best-selling products that everyone's talking about and
                upgrade your style effortlessly.
              </p>
            </div>
            <FeaturedProducts />
            <div className="w-full py-5 bg-white mt-6 mb-3 flex flex-col items-center justify-center">
              <p className="text-gray-600 md:text-2xl font-medium">
                Discover Popular Categories
              </p>
              <p className="text-gray-500 text-center text-sm md:text-lg font-medium">
                Browse through our wide range of categories and find products
                that suit your needs.
              </p>
            </div>
            <Categories />
            <NewsletterSubscription />
            <TakeToTop />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
