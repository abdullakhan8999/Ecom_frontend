import React, { useEffect } from "react";
import MetaData from "../common/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrderPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const address = ` ${shippingInfo.address},  ${shippingInfo.city},  ${shippingInfo.state},  ${shippingInfo.pinCode},  ${shippingInfo.country}.`;
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order | MaNa Ecomm" />
      <CheckoutSteps activeStep={1} />
      <div className="max-w-screen-xl w-full mx-auto p-4 min-h-screen">
        <div className="bg-white shadow-md w-full  mx-auto rounded-md p-8 flex flex-col items-center justify-center md:flex-row  md:items-start md:justify-around ">
          <div className="">
            <h2 className="text-xl font-semibold mb-4">Shipping info:</h2>
            <div className="space-y-2">
              <div className="flex items-start">
                <p className="font-semibold w-20">Name:</p>
                <span>{user.name}</span>
              </div>
              <div className="flex items-start">
                <p className="font-semibold w-20">Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-semibold w-20 ">Address:</p>
                <span className="md:w-96">{address}</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-4 mt-6">
              Your Cart Items:
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center gap-4 flex-wrap"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <Link
                      to={`/product/${item.product}`}
                      className="text-gray-700 hover:underline"
                    >
                      <p className="font-semibold">{item.name}</p>
                    </Link>
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500" />
                      <p className="ml-1 text-gray-500">
                        {item.quantity} X ₹{item.price.toFixed(2)} ={" "}
                        <b className=" whitespace-nowrap">
                          ₹ {(item.price * item.quantity).toFixed(2)}
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-96">
            <h2 className=" text-xl font-semibold mb-4 mt-6 md:mt-0">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="font-medium">Total Quantity:</p>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">GST:</p>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between orderSummaryTotal">
                <p className="font-semibold">
                  <b>Total:</b>
                </p>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            <button
              onClick={() => proceedToPayment()}
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrderPage;
