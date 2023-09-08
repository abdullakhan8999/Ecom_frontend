import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LineCharts from "./LineCharts";
import DonutCharts from "./DonutCharts";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllProducts } from "../../../Actions/productActions";
import { AdminGetAllOrders } from "../../../Actions/orderActions";
import { adminGetAllUsers } from "../../../Actions/adminAction";
import MetaData from "../../common/MetaData";
import Loader from "../../Loader";

const DashboardSection = ({ setActiveSection }) => {
  const dispatch = useDispatch();
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
  const { products, productsLoading } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.orders);

  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(adminGetAllProducts());
    dispatch(AdminGetAllOrders());
    dispatch(adminGetAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.length > 0 &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  return (
    <>
      {productsLoading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={"Dashboard | Admin - MaNa Ecomm"} />
          <p className="w-full mx-auto text-center md:text-2xl font-bold bg-blue-500 text-white py-4 ">
            Total Amount: ₹ {totalAmount}
          </p>
          <div className="mt-4 mb-6">
            <div className="w-full flex items-center gap-2 md:gap-4 flex-wrap justify-center">
              <div
                onClick={() => setActiveSection("products")}
                className="text-sm md:text-lg h-[100px] md:h-[150px] flex-col ring-slate-900 hover:ring-2 cursor-pointer flex items-center justify-center w-[100px] md:w-[150px] bg-orange-300  rounded-full"
              >
                <p>{products && products.length}</p>
                <p>Products</p>
              </div>
              <div
                onClick={() => setActiveSection("users")}
                className="text-sm md:text-lg h-[100px] md:h-[150px] flex-col text-white ring-slate-900 hover:ring-2 cursor-pointer flex items-center justify-center w-[100px] md:w-[150px] bg-orange-900  rounded-full"
              >
                <p>{users && users.length}</p>
                <p>Users</p>
              </div>
              <div
                onClick={() => setActiveSection("orders")}
                className="text-sm md:text-lg h-[100px] md:h-[150px] flex-col  ring-slate-900 hover:ring-2 cursor-pointer flex items-center justify-center w-[100px] md:w-[150px] bg-orange-600  rounded-full"
              >
                <p>{orders && orders.length}</p>
                <p>Orders</p>
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <LineCharts />
            <DonutCharts />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSection;
