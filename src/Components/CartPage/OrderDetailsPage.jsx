import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import MetaData from "../common/MetaData";

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const { order, orderLoading } = useSelector((state) => state.orders);
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      {orderLoading ? (
        <Loader />
      ) : (
        <div className="max-w-screen-xl mx-auto p-4 min-h-screen">
          <MetaData title={`Order Details | MaNa Ecomm`} />
          <div className="flex items-center mb-4">
            <button
              className="text-blue-500 hover:underline flex items-center"
              onClick={goBack}
            >
              <BsArrowLeft className="mr-1" />
              Back to Orders
            </button>
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            Order Details for Order ID: {order._id}
          </h2>

          <div className="bg-white shadow-md sm:rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
            <p className=" w-80">{order.shippingInfo.address}</p>
            <p>
              {order.shippingInfo.city}, {order.shippingInfo.state},{" "}
              {order.shippingInfo.pinCode}
            </p>
            <p>Country: {order.shippingInfo.country}</p>
            <p>Phone: {order.shippingInfo.phoneNumber}</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">
              Payment Information
            </h3>
            <p>Payment ID: {order.paymentInfo.id}</p>
            <p>
              Payment Status:
              <span
                className={`${
                  order.paymentInfo.status ? "text-green-500" : "text-red-500"
                }`}
              >
                &nbsp;{order.paymentInfo.status}
              </span>
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Ordered Items</h3>
            <ul>
              {order.orderItems.map((item) => (
                <li key={item.product} className="mb-2">
                  <div className="flex items-center group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <p
                        className="text-lg font-semibold group-hover:underline hover:cursor-pointer"
                        onClick={() => navigate(`/product/${item.product}`)}
                      >
                        {item.name}
                      </p>
                      <p>Price: ₹{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-4">Order Summary</h3>
            <p>Items Price: ₹{order.itemsPrice}</p>
            <p>Tax Price: ₹{order.taxPrice}</p>
            <p>Shipping Price: ₹{order.shippingPrice}</p>
            <p>Total Price: ₹{order.totalPrice}</p>

            <h3 className={`text-lg font-semibold mt-4`}>Order Status</h3>
            <p
              className={` ${
                order.orderStatus !== "Processing"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {order.orderStatus}
            </p>

            <h3 className="text-lg font-semibold mt-4">Order Date</h3>
            <p>{formatDate(order.createAt)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailsPage;
