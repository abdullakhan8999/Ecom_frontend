import React, { useState } from "react";
import Rating from "../common/Rating";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const ReviewSection = ({ product }) => {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((currentReview + 1) % product.reviews.length);
  };

  const prevReview = () => {
    setCurrentReview(
      currentReview === 0 ? product.reviews.length - 1 : currentReview - 1
    );
  };

  return (
    <div className="max-w-md p-4 ">
      <div className="bg-white  shadow-md sm:rounded-lg p-4">
        <div className="relative  w-full">
          <div className="text-lg  w-full md:text-2xl mb-2 flex items-center justify-between gap-4">
            <span
              className="cursor-pointer active:translate-y-1 font-bold text-xl transition-transform duration-300"
              onClick={() => prevReview()}
            >
              <BsFillArrowLeftCircleFill size={24} />
            </span>
            <div className="">
              {product.reviews[currentReview].name}
              <div className="mb-4">
                <Rating value={product.reviews[currentReview].rating} />
              </div>
              <p className="text-gray-700">
                {product.reviews[currentReview].comment}
              </p>
            </div>
            <span
              className="cursor-pointer active:translate-y-1 font-bold text-xl transition-transform duration-300"
              onClick={() => nextReview()}
            >
              <BsFillArrowRightCircleFill size={24} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
