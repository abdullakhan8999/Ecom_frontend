import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import ScrollToTop from "../common/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { startUiLoading, stopUiLoading } from "../../reducers/uiLoadingSlice";
import { useParams } from "react-router-dom";
import {
  fetchProductsByCategory,
  getProductDetails,
} from "../../Actions/productActions";
import MetaData from "../common/MetaData";
import ProductImageSection from "./ProductImageSection.jsx";
import Rating from "../common/Rating";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { CgTrack } from "react-icons/cg";
import { MdSecurity } from "react-icons/md";
import ProductCard from "./ProductCard";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { idProduct } = useParams();
  useEffect(() => {
    ScrollToTop();
    dispatch(getProductDetails(idProduct));
  }, [idProduct]);

  // State
  const isUiLoading = useSelector((state) => state.uiLoading.isUiLoading);
  const { product, productLoading } = useSelector((state) => state.product);
  const { products } = useSelector((state) => state.products);
  const [isLoadingProductsPage, setIsLoadingProductsPage] = useState(false);

  //useEffect
  useEffect(() => {
    if (isUiLoading || productLoading) {
      setIsLoadingProductsPage(true);
    } else {
      setIsLoadingProductsPage(false);
    }
  }, [isUiLoading, productLoading]);

  // Loading products
  useEffect(() => {
    dispatch(startUiLoading());
    setTimeout(() => {
      dispatch(stopUiLoading());
    }, 2000);
  }, []);

  // Loading related products
  useEffect(() => {
    if (product) {
      dispatch(fetchProductsByCategory(product.category));
    }
  }, [product]);

  return (
    <>
      {isLoadingProductsPage ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- MaNa-Ecomm-Store`} />
          <div className="max-w-screen-xl z-20 relative flex flex-wrap items-center justify-between mx-auto p-4">
            {/* Heading */}
            <div
              className="bg-white p-2 mb-4 w-full text-left md:text-lg font-bold tracking-wider text-sm
            "
            >
              Product: {product.name}
            </div>
            <div className="ProductDetailsSection w-full flex gap-4 items-start justify-between flex-col md:flex-row">
              <div className="section1  w-full md:w-1/2 ">
                {product && product.images && (
                  <ProductImageSection images={product.images} />
                )}
              </div>
              <div className="section2 w-full md:w-1/2">
                <div className="detailsBlock-1">
                  <h4 className="text-xl font-bold tracking-wider">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between flex-wrap">
                    <Rating value={product.ratings} className="text-lg" />
                    {product.numberOfReview >= 1 && (
                      <p className=" font-semibold">
                        ( {product.numberOfReview} customer reviews )
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-start gap-4 flex-wrap mt-4 text-gray-600">
                    <span className="text-lg">MRP ₹{product.price}</span>
                    <div className=" text-green-500 font-bold">
                      <span>10% OFF</span>
                    </div>
                  </div>
                </div>
                <div className="detailsBlock-2 my-3">
                  <p className="text-sm md:text-lg">
                    {product.description} Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Nulla provident ipsa quis blanditiis
                    dolorum, ipsam expedita quibusdam sit impedit, ratione
                    necessitatibus? Nesciunt nisi id ratione repellat iusto?
                    Culpa, praesentium doloribus.
                  </p>
                  <div className="flex items-center justify-start gap-4 flex-wrap mt-4 text-gray-600">
                    <div className="flex flex-col justify-center items-center  text-sm">
                      <TbTruckDelivery
                        size={24}
                        className=" bg-[#edf2ed] p-1 rounded-2xl mb-1 "
                      />
                      <p>Free Delivery</p>
                    </div>
                    <div className="flex flex-col justify-center items-center  text-sm">
                      <CgTrack
                        size={24}
                        className=" bg-[#edf2ed] p-1 rounded-2xl mb-1 "
                      />
                      <p>Track Your Order</p>
                    </div>
                    <div className="flex flex-col justify-center items-center  text-sm">
                      <MdSecurity
                        size={24}
                        className=" bg-[#edf2ed] p-1 rounded-2xl mb-1 "
                      />
                      <p>Warranty</p>
                    </div>
                    <div className="flex flex-col justify-center items-center  text-sm">
                      <TbReplace
                        size={24}
                        className=" bg-[#edf2ed] p-1 rounded-2xl mb-1 "
                      />
                      <p>30 Days Replacement</p>
                    </div>
                  </div>
                </div>
                <div className="detailsBlock-3 my-3 text-sm md:text-lg">
                  <p>
                    Available :{" "}
                    <span
                      className={` font-bold ${
                        product.stock > 0
                          ? "underLine text-green-500 "
                          : "underLine text-red-500 "
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </p>
                  <p>
                    ID:
                    <span className="ml-2">{product._id}</span>
                  </p>
                  <p>
                    Brand:
                    <span className="ml-2">{product.brand}</span>
                  </p>
                  <p>
                    Brand:
                    <span className="ml-2">{product.category}</span>
                  </p>
                </div>
                <div className="h-[2px] w-full bg-slate-200 rounded-full mb-3"></div>
                {product.stock > 0 && (
                  <button className="bg-sky-500 hover:bg-sky-700 hover:text-slate-300 tracking-wider  p-2 rounded-xl text-sm md:text-lg text-white font-bold ">
                    Add To Cart
                  </button>
                )}
              </div>
            </div>

            {products && products.length > 1 && (
              <>
                <div className="h-[2px] w-full bg-slate-200 rounded-full my-8"></div>
                <section className="w-full flex gap-4 items-start justify-between flex-col mx-auto">
                  <h3 className="bg-white p-2 mb-4 w-full  md:text-lg font-bold tracking-wider text-sm">
                    Related Products:
                  </h3>{" "}
                  <div className="related-product grid grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map(
                      (product, i) =>
                        product._id !== idProduct &&
                        i <= 2 && (
                          <ProductCard key={product._id} product={product} />
                        )
                    )}
                  </div>
                </section>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetailsPage;
