import React, { useEffect, useRef } from "react";
import MetaData from "../common/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { BsFillCalendar2EventFill } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { MdVpnLock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import showNotification from "../../util/showNotification";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../reducers/ordersSlice";
import { newOrder } from "../../Actions/orderActions";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.orders);
  // 4242424242424242
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigation("/login");
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (error) {
      showNotification(error, "warning");
      dispatch(clearErrors());
    }
  }, [dispatch, error, showNotification]);

  //func
  const handlePaymentForm = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      const client_secret = data.clint_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        showNotification(result.error.message, "warning");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(newOrder(order));
          navigation("/success");
        } else {
          showNotification(
            "There's some issue while processing payment",
            "warning"
          );
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      showNotification(error.response.data.message, "warning");
    }
  };
  return (
    <>
      <MetaData title="Payment | MaNa Ecomm" />
      <CheckoutSteps activeStep={2} />
      <div className="max-w-screen-xl mx-auto p-4 min-h-screen">
        <div className="bg-white shadow-md w-full md:w-80 mx-auto rounded-md p-8">
          <div className="container">
            <form onSubmit={(e) => handlePaymentForm(e)}>
              <h2 className="text-xl font-semibold mb-4 mt-6 md:mt-0">
                Card Info
              </h2>
              <div className="mb-4 flex items-center">
                <FaCreditCard className="absolute translate-x-4 mr-2" />
                <CardNumberElement className="paymentInput border focus:ring-slate-500 focus:ring-2 ring-slate-300 ring-1  p-2 rounded w-full pl-10" />
              </div>
              <div className="mb-4 flex items-center">
                <BsFillCalendar2EventFill className="absolute translate-x-4 mr-2" />
                <CardExpiryElement className="paymentInput border ring-1  p-2 focus:ring-slate-500 focus:ring-2 ring-slate-300 rounded w-full pl-10" />
              </div>
              <div className="mb-4 flex items-center">
                <MdVpnLock className="absolute translate-x-4 mr-2" />
                <CardCvcElement className="paymentInput border focus:ring-slate-500 focus:ring-2 ring-slate-300 ring-1  p-2 rounded w-full pl-10" />
              </div>

              <input
                type="submit"
                value={`Pay - ₹ ${orderInfo && orderInfo.totalPrice}/-`}
                ref={payBtn}
                className="paymentFormBtn w-full bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
