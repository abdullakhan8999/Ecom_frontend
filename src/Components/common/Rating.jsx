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
          className={`text-${
            index < value ? "yellow" : "gray"
          }-500 fill-current text-lg`}
        />
      ))}
    </div>
  );
};

export default Rating;
