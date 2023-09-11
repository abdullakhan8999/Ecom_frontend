import React, { useEffect, useState } from "react";
import DashboardSection from "./DashboardSection.jsx";
import ProductsSection from "./ProductsSection.jsx";
import UsersSection from "./UsersSection.jsx";
import ReviewsSection from "./ReviewsSection.jsx";
import OrdersSection from "./OrdersSection.jsx";
import {
  FaChartLine,
  FaBox,
  FaUsers,
  FaStar,
  FaShoppingBag,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigation = useNavigate();
  const { isAuthenticated, user, loadingUser } = useSelector(
    (state) => state.user
  );
  // useEffect
  useEffect(() => {
    if (!loadingUser && !isAuthenticated && user !== "admin") {
      navigation("/login");
    }
  }, [user]);

  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <div className="bg-white w-full mx-auto p-4 min-h-screen">
          <p className="flex items-center capitalize justify-center font-bold text-lg min-w-940:text-3xl hover:text-sky-400 mb-8">
            {activeSection}
          </p>
          <div className="flex flex-col items-start justify-start h-full">
            <ul className="flex items-start mb-4 justify-between w-full  gap-[8px] md:gap-4 flex-wrap text-xs md:text-lg">
              <li
                className={`hover:text-sky-400 capitalize flex items-center gap-2 cursor-pointer ${
                  activeSection === "dashboard" &&
                  " text-sky-500 underline underline-offset-4 font-bold"
                }`}
                onClick={() => setActiveSection("dashboard")}
              >
                <FaChartLine className=" text-xl" />
                <span className="md:block hidden">Dashboard</span>
              </li>
              <li
                className={`hover:text-sky-400 capitalize flex items-center gap-2 cursor-pointer ${
                  activeSection === "products" &&
                  " text-sky-500 underline underline-offset-4 font-bold"
                }`}
                onClick={() => setActiveSection("products")}
              >
                <FaBox className="text-xl " />
                <span className="md:block hidden">Products</span>
              </li>
              <li
                className={`hover:text-sky-400 capitalize flex items-center gap-2 cursor-pointer ${
                  activeSection === "users" &&
                  " text-sky-500 underline underline-offset-4 font-bold"
                }`}
                onClick={() => setActiveSection("users")}
              >
                <FaUsers className="text-xl " />
                <span className="md:block hidden">Users</span>
              </li>
              <li
                className={`hover:text-sky-400 capitalize flex items-center gap-2 cursor-pointer ${
                  activeSection === "orders" &&
                  " text-sky-500 underline underline-offset-4 font-bold"
                }`}
                onClick={() => setActiveSection("orders")}
              >
                <FaShoppingBag className="text-xl " />
                <span className="md:block hidden">Orders</span>
              </li>
              <li
                className={`hover:text-sky-400 capitalize flex items-center gap-2 cursor-pointer ${
                  activeSection === "reviews" &&
                  " text-sky-500 underline underline-offset-4 font-bold"
                }`}
                onClick={() => setActiveSection("reviews")}
              >
                <FaStar className="text-xl " />
                <span className="md:block hidden">Reviews</span>
              </li>
            </ul>

            <div className="w-full">
              {activeSection === "dashboard" && (
                <div className="container">
                  <DashboardSection setActiveSection={setActiveSection} />
                </div>
              )}
              {activeSection === "products" && (
                <div className="container">
                  <ProductsSection />
                </div>
              )}
              {activeSection === "users" && (
                <div className="container">
                  <UsersSection />
                </div>
              )}
              {activeSection === "reviews" && (
                <div className="container">
                  <ReviewsSection />
                </div>
              )}
              {activeSection === "orders" && (
                <div className="container">
                  <OrdersSection />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
