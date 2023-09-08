import React from "react";
import MetaData from "../common/MetaData";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const OrderSuccessPage = () => {
  const navigation = useNavigate();
  const orderLoading = useSelector((state) => state.orders.orderLoading);
  return (
    <>
      <MetaData title="Order Success | MaNa Ecomm" />
      {orderLoading ? (
        <Loader />
      ) : (
        <div className=" mx-auto p-4 bg-white min-h-screen">
          <div className=" h-full  w-full flex items-center justify-center flex-col mx-auto rounded-md p-8">
            <div className=" p-2 bg-orange-600 w-10 rounded-full mx-auto h-10 flex">
              <BsFillCartCheckFill className="text-white text-xl p-0 m-0 mx-auto inset-0" />
            </div>
            <h2 className="text-sm md:text-lg font-semibold mb-4 mt-6 md:mt-0">
              Your Order has been Placed successfully
            </h2>
            <button
              onClick={() => navigation("/orders")}
              className="bg-slate-600 py-2 px-4 text-white hover:bg-slate-800 font-semibold text-sm mb-4 mt-6 md:mt-0 cursor-pointer"
            >
              View Orders
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSuccessPage;
