import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import ScrollToTop from "../common/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { startUiLoading, stopUiLoading } from "../../reducers/uiLoadingSlice";
import { useParams } from "react-router-dom";
import {
  fetchProductsByCategory,
  getProductDetails,
  newReview,
} from "../../Actions/productActions";
import MetaData from "../common/MetaData";
import ProductImageSection from "./ProductImageSection.jsx";
import ReviewSection from "./ReviewSection.jsx";
import Rating from "../common/Rating";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { CgTrack } from "react-icons/cg";
import { MdSecurity, MdRemoveCircle, MdAddCircle } from "react-icons/md";
import ProductCard from "./ProductCard";
import { addProductToCart } from "../../Actions/cartActions";
import showNotification from "../../util/showNotification";
import { FaStar, FaTimes } from "react-icons/fa";
import { newReviewRequestReset } from "../../reducers/newReviewSlice";

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
  const {
    newReviewLoading,
    success,
    error: reviewError,
  } = useSelector((state) => state.newReview);
  const { products } = useSelector((state) => state.products);
  const [isLoadingProductsPage, setIsLoadingProductsPage] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //useEffect
  useEffect(() => {
    if (isUiLoading || productLoading || newReviewLoading) {
      setIsLoadingProductsPage(true);
    } else {
      setIsLoadingProductsPage(false);
    }
  }, [isUiLoading, productLoading]);

  useEffect(() => {
    if (success) {
      showNotification("Review added successfully", "success");
      dispatch(getProductDetails(idProduct));
      dispatch(newReviewRequestReset());
    }
    if (reviewError) {
      showNotification(reviewError, "error");
    }
  }, [success, reviewError]);
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

  //func
  const increaseQuantity = () => {
    if (cartQuantity < product.stock) {
      setCartQuantity(cartQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
    }
  };
  const addToCart = () => {
    dispatch(addProductToCart(idProduct, cartQuantity));
    showNotification(`${product.name} Added to cart successfully`, "success");
  };
  const handleCloseClick = () => {
    setShowReviewForm(false);
    setRating(0);
    setComment("");
  };
  const handleAddReview = async (event) => {
    event.preventDefault();
    const reviewData = {
      rating,
      comment,
      productId: product._id,
    };
    await dispatch(newReview(reviewData));
    setRating(0);
    setComment("");

    setShowReviewForm(false);
  };
  return (
    <>
      {isLoadingProductsPage ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} | MaNa Ecomm`} />
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
                <div className=" w-full flex items-center flex-wrap gap-4">
                  {product.stock > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-2 mr-3">
                        <button
                          disabled={cartQuantity === 1}
                          className={`text-green-500 ${
                            cartQuantity > 1 && "hover:text-green-700"
                          }`}
                          onClick={decreaseQuantity}
                        >
                          <MdRemoveCircle size={24} />
                        </button>
                        <span className="text-lg">{cartQuantity}</span>
                        <button
                          disabled={cartQuantity === product.stock}
                          onClick={increaseQuantity}
                          className={`text-green-500 ${
                            cartQuantity !== product.stock &&
                            "hover:text-green-700"
                          }`}
                        >
                          <MdAddCircle size={24} />
                        </button>
                      </div>
                      <button
                        disabled={product.stock < 1}
                        className="bg-sky-500 hover:bg-sky-700 hover:text-slate-300 tracking-wider p-2 rounded-xl text-sm md:text-lg text-white font-bold"
                        onClick={() => addToCart()}
                      >
                        Add To Cart
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-orange-500 hover:bg-orange-700 hover:text-slate-300 tracking-wider p-2 rounded-xl text-sm md:text-lg text-white font-bold"
                  >
                    Submit review
                  </button>
                </div>
              </div>
            </div>
            <div className=" w-full min-h-[400px] mt-8">
              <h3 className="bg-white p-2 mb-4 w-full  md:text-lg font-bold tracking-wider text-sm ">
                Customer Reviews
              </h3>
              {product.reviews && product.reviews[0] ? (
                <ReviewSection product={product} />
              ) : (
                <p className="text-center text-lg md:text-xl w-full mx-auto mb-8">
                  No Reviews Yet
                </p>
              )}
            </div>
            {products && products.length > 1 && (
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
            )}
            {showReviewForm && (
              <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white mx-2 rounded-lg p-6">
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={handleCloseClick}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold mb-4">Submit review</h2>
                  <form onSubmit={handleAddReview}>
                    <label className="block mb-2">
                      <span className="font-semibold">Rating Out of 5:</span>
                      <div className="ratings-icon flex items-center">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <FaStar
                            key={index}
                            size={20}
                            color={rating >= index + 1 ? "#ffb300" : "#C0C0C0"}
                            onClick={() => setRating(index + 1)}
                          />
                        ))}
                      </div>
                    </label>
                    <label className="mb-2 flex flex-col">
                      <span className="font-semibold">Comment:</span>
                      <textarea
                        className="border border-gray-300 rounded w-full p-1"
                        value={comment}
                        cols="30"
                        rows="10"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </label>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600"
                    >
                      Submit review
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetailsPage;
