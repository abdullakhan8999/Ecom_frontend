import { useDispatch } from "react-redux";
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { popularCategories } from "../../Constants/common";
import { useNavigate } from "react-router-dom";
import {
  fetchAllProducts,
  fetchProductsByCategory,
} from "../../Actions/productActions";
import { setSearchCategory } from "../../reducers/searchCategorySlice";

const Categories = () => {
  const categoriesRef = useRef(null);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const scrollLeft = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollLeft -= 200; // Scroll left by 200px
    }
  };

  const scrollRight = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollLeft += 200; // Scroll right by 200px
    }
  };

  const handleGetCategoryProducts = async (category) => {
    dispatch(setSearchCategory(category));
    navigation("/products");
  };

  return (
    <div className="flex items-center overflow-x-scroll scrollbar-hide">
      <button
        className="flex items-center justify-center p-2 rounded-lg bg-gray-200"
        onClick={scrollLeft}
      >
        <FaChevronLeft />
      </button>
      <div
        ref={categoriesRef}
        className="flex items-center overflow-x-scroll py-4 mx-4 px-2 space-x-4 snaps-inline scrollbar-hide"
      >
        {popularCategories.map((category, index) => (
          <div
            key={index}
            className="p-4 cursor-pointer min-w-[350px] h-[350px] rounded-lg shadow-md flex flex-col justify-end relative"
            onClick={() => handleGetCategoryProducts(category)}
          >
            <img
              src={`https://source.unsplash.com/350x350/?${category}`}
              alt={category}
              className="object-cover rounded-lg w-full h-full absolute top-0 left-0 z-[-1]"
            />
            <div className="text-white text-center pb-2 bg-black bg-opacity-50">
              {category}
            </div>
          </div>
        ))}
      </div>
      <button
        className="flex items-center justify-center p-2 rounded-lg bg-gray-200"
        onClick={scrollRight}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Categories;
