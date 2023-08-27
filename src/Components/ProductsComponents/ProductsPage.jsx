import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { startUiLoading, stopUiLoading } from "../../reducers/uiLoadingSlice";
import { fetchAllProducts } from "../../Actions/productActions";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const popularCategories = [
  "Electronics",
  "Fashion (Men's)",
  "Fashion (Women's)",
  "Fashion (Kids)",
  "Home & Furniture",
  "Beauty & Personal Care",
  "Books & Stationery",
  "Sports & Outdoors",
  "Health & Wellness",
  "Appliances",
  "Toys & Games",
  "Automotive & Tools",
  "Jewelry & Accessories",
  "Groceries & Gourmet Foods",
  "Pet Supplies",
  "Musical Instruments",
];

const ProductsPage = () => {
  const dispatch = useDispatch();
  const isUiLoading = useSelector((state) => state.uiLoading.isUiLoading);
  const {
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [isLoadingProductsPage, setIsLoadingProductsPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  // Page Loading
  useEffect(() => {
    if (isUiLoading) {
      setIsLoadingProductsPage(true);
    } else {
      setIsLoadingProductsPage(false);
    }
  }, [isUiLoading]);

  // Fetch products
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Filter, sort, and search logic
  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory
  );

  // Sorting logic here (sortBy)

  const searchedProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //set Page
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
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
        <>
          <Header />
          <div className="container mx-auto p-4">
            {/* Filtering and Sorting Controls */}
            <div className="filterBox">
              <div className="products-page-price-filter">
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={250000}
                />
              </div>
              <div className="products-page-category-filter">
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
              <fieldset className="products-page-star-filter">
                <Typography className="star-filter" component="legend">
                  Ratings Above
                </Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded shadow-md"
                >
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-2"
                  />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {resultPerPage < count && (
              <div className="paginationBox">
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
          </div>
        </>
      )}
    </>
  );
};

export default ProductsPage;
