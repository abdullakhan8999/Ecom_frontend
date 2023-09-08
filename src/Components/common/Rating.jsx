import React from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ value }) => {
  // Maximum rating value
  const maxRating = 5;

  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => (
        <FaStar
          key={index}
          className={`fill-current text-lg ${
            index < value ? "text-yellow-500" : "text-gray-500"
          }`}
        />
      ))}
    </div>
  );
};

export default Rating;
