import React, { Fragment } from "react";
import { FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CheckoutSteps = ({ activeStep }) => {
  const navigate = useNavigate();
  const steps = [
    {
      label: "Shipping Details",
      icon: <MdLocalShipping className="text-2xl" />,
    },
    {
      label: "Confirm Order",
      icon: <FaCheckCircle className="text-2xl" />,
    },
    {
      label: "Payment",
      icon: <FaCreditCard className="text-2xl" />,
    },
  ];

  const handleCheckoutStep = (index) => {
    if (index === 0 && activeStep !== 0) {
      navigate("/shipping");
    }
    if (index === 1 && activeStep !== 1) {
      navigate("/order_confirm");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-xl w-[80%] mx-auto p-4 flex flex-col md:flex-row items-start justify-start gap-2 md:items-center md:justify-center md:space-x-4">
        {steps.map((item, index) => (
          <div
            key={index}
            className={`flex items-center group ${
              index !== steps.length - 1 && "w-[100%] md:w-[33%]"
            } space-x-2 ${
              activeStep >= index ? "text-green-500" : "text-gray-600"
            }`}
            onClick={() => handleCheckoutStep(index)}
          >
            <div
              className={`rounded-full  bg-gray-200 p-1 ${
                index !== steps.length - 1 && " group-hover:cursor-pointer"
              }`}
            >
              {item.icon}
            </div>
            <div
              className={`whitespace-nowrap ${
                index !== steps.length - 1 &&
                "group-hover:underline group-hover:cursor-pointer"
              }`}
            >
              {item.label}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`rounded-full hidden md:block h-2 w-full ${
                  activeStep >= index ? "bg-green-500" : "bg-gray-600"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
