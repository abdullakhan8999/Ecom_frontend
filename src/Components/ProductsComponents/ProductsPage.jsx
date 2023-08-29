import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { startUiLoading, stopUiLoading } from "../../reducers/uiLoadingSlice";
import {
  clearProductsErrors,
  fetchAllProducts,
  fetchProductsByCategory,
} from "../../Actions/productActions";
import Pagination from "react-js-pagination";
import { RiFilter2Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";
import TakeToTop from "../common/TakeToTop";
import { popularCategories } from "../../Constants/common";
import Rating from "../common/Rating";
import { setSearchCategory } from "../../reducers/searchCategorySlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  let { keyword } = useParams();

  // Scroll to top
  useEffect(() => {
    ScrollToTop();
  }, []);

  const isUiLoading = useSelector((state) => state.uiLoading.isUiLoading);
  const {
    error,
    products,
    productsCount,
    productsLoading,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [isLoadingProductsPage, setIsLoadingProductsPage] = useState(false);
  const searchCategory = useSelector((state) => state.searchCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  // const [selectedCategory, setSelectedCategory] = useState("All");
  // const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  // Page Loading
  useEffect(() => {
    if (isUiLoading || productsLoading) {
      setIsLoadingProductsPage(true);
    } else {
      setIsLoadingProductsPage(false);
    }
  }, [isUiLoading, productsLoading]);

  // Loading products
  useEffect(() => {
    dispatch(startUiLoading());
    setTimeout(() => {
      dispatch(stopUiLoading());
    }, 2000);
  }, []);

  // Fetch products
  useEffect(() => {
    if (searchCategory) {
      setCategory(searchCategory);
      dispatch(fetchProductsByCategory(searchCategory));
      dispatch(setSearchCategory(null));
    } else {
      dispatch(
        fetchAllProducts(keyword, currentPage, price, category, ratings)
      );
      if (error) {
        console.error("Failed to fetch products:", error);
        dispatch(clearProductsErrors());
      }
    }
  }, [
    dispatch,
    clearProductsErrors,
    keyword,
    currentPage,
    price,
    category,
    ratings,
  ]);

  const handleGetAllProducts = () => {
    setCategory("");
    dispatch(fetchAllProducts(keyword, currentPage, price, category, ratings));
  };

  // Pagination logic
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      {isLoadingProductsPage ? (
        <Loader />
      ) : (
        <div className="max-w-screen-xl mx-auto p-4 relative">
          {/* Filtering, Sorting Controls and Products */}
          <div className="flex  flex-col mb-4">
            <div
              className="lg:hidden cursor-pointer mb-4 bg-white p-2 flex items-center gap-2 text-left"
              onClick={() => setShowFilter(!showFilter)}
            >
              <RiFilter2Fill size={24} className="cursor-pointer" />{" "}
              <span className=" uppercase font-bold tracking-wider ">Menu</span>
            </div>

            {/* Filter Controls */}
            <div
              className={`filterBox bg-white p-2 flex justify-between w-full flex-wrap gap-2 mb-4 ${
                showFilter ? "" : "hidden lg:flex"
              }`}
            >
              <div className=" flex justify-between w-full flex-wrap gap-2 items-center ">
                <div className="products-page-price-filter flex items-center gap-1 flex-wrap">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="range"
                    id="price"
                    value={price[1]}
                    onChange={(e) => priceHandler([price[0], +e.target.value])}
                    min={0}
                    max={250000}
                    step={1}
                  />
                  <span>${price[1]}</span>
                </div>
                <div className="products-page-category-filter flex items-center gap-1 flex-wrap">
                  <label htmlFor="category">Select Category:</label>
                  <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="categoryBox"
                  >
                    <option value="">-- Select --</option>
                    {popularCategories.map((category) => (
                      <option
                        className="category-link"
                        value={category}
                        key={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <fieldset className="products-page-star-filter flex items-center gap-1 flex-wrap">
                  <div className="star-filter legend">Ratings Above</div>
                  <input
                    type="range"
                    value={ratings}
                    onChange={(e) => setRatings(+e.target.value)}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5}
                  />
                  <div className="ratings-icon flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        size={20}
                        color={ratings >= index + 1 ? "#ffb300" : "#C0C0C0"}
                      />
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded shadow-md flex flex-col justify-between"
                >
                  <div className="">
                    <Link to={`/product/${product._id}`} className="group">
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-48 object-cover mb-2"
                      />
                      <h2 className="text-lg font-semibold group-hover:underline">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-2">
                      ${product.price.toFixed(2)}
                    </p>
                    <Rating value={product.ratings} />
                  </div>
                  <button className="w-full py-2 my-3 bg-sky-500 text-white font-bold tracking-widest hover:bg-sky-600">
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Pagination */}
          {resultPerPage < count && (
            <div className="paginationBox text-sm md:text-lg my-8">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo && setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
          <TakeToTop />
          {products.length === 0 && !isLoadingProductsPage && (
            <div className="text-center mt-8">
              <p className="text-gray-500">No products available.</p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleGetAllProducts()}
              >
                Get All Products
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductsPage;
