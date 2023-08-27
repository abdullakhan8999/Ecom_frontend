import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-gray-200   p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to={"/"}
            className="flex items-center text-sm font-bold text-gray-400 md:text-lg min-w-940:text-2xl hover:text-sky-400"
          >
            <FaShoppingCart size={24} className="  mr-2" />
            MaNa Ecomm
          </Link>
        </div>
        <p className="text-gray-400 text-xs md:text-sm">
          &copy; 2023 All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
