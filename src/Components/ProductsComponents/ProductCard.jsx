import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Rating from "../common/Rating";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../Actions/cartActions";
import showNotification from "../../util/showNotification";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    dispatch(addProductToCart(product._id, 1));
    showNotification(`${product.name} Added to cart successfully`, "success");
  };

  return (
    <div className="relative group overflow-hidden cursor-pointer">
      <img
        src={
          product?.images?.[0]?.url ||
          "https://res.cloudinary.com/dwpi8ryr2/image/upload/v1692971455/avatars/Black_White_Red_Modern_Black_Friday_Loading_Instagram_Post_f6tii1.png"
        }
        alt={product?.name}
        className="w-full h-[300px] object-cover transition transform group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        {showDetails && (
          <div className="bg-black w-full h-full bg-opacity-70 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity p-4">
            <Link
              to={`/product/${product._id}`}
              className="text-sm hover:underline md:text-lg text-center font-bold text-white mb-2"
            >
              {product.name}
            </Link>
            <p className="text-sm md:text-lg mb-2">${product.price}</p>
            <Rating value={product.ratings} />
            <button
              onClick={() => handleAddToCart()}
              disabled={product.stock < 1}
              className="bg-blue-500 text-white px-2 md:px-4 text-xs md:text-lg py-2 rounded-md mt-2"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
