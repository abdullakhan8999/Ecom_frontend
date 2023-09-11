import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../../common/MetaData";
import {
  AdminGetAllOrders,
  clearUserErrors,
  deleteOrder,
  getOrderDetails,
} from "../../../Actions/orderActions";
import Loader from "../../Loader";
import UpdateOrderStatus from "./UpdateOrderStatus.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import showNotification from "../../../util/showNotification";

const OrdersSection = () => {
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

  const { orderLoading, orders, status, error } = useSelector(
    (state) => state.orders
  );
  let countRow = 0;
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [IsOrder, setIsOrder] = useState(null);
  const [showUpdateOrder, setShowUpdateOrder] = useState(false);

  useEffect(() => {
    dispatch(AdminGetAllOrders());
  }, []);

  useEffect(() => {
    if (error) {
      showNotification(error, "waring");
      dispatch(clearUserErrors());
    }
    if (status === "Order deleted Successfully") {
      showNotification("Order deleted Successfully", "info");
      dispatch(clearUserErrors());
    }
  }, [showNotification, status, error]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const goToOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
    navigation(`/order/${orderId}`);
  };

  const handleUpdateOrder = (order) => {
    setIsOrder(order);
    setShowUpdateOrder(true);
  };

  const handleDeleteOrderById = (order) => {
    setMessage("Are you sure you want to delete this order?");
    setShowMessage(true);
    setIsOrder(order);
  };

  const handleAlertCancel = () => {
    setShowMessage(false);
    setIsOrder(null);
    setMessage(``);
  };

  const handleAlertConfirm = async () => {
    await dispatch(deleteOrder(IsOrder._id));
    await dispatch(AdminGetAllOrders());
    handleAlertCancel();
  };

  return (
    <>
      <MetaData title={`Orders | MaNa Ecomm`} />
      {orderLoading ? (
        <Loader />
      ) : (
        <>
          <p className="w-full mx-auto text-center md:text-2xl font-bold bg-blue-500 text-white py-4 ">
            Total Orders: {orders && orders.length}
          </p>
          <div className="relative overflow-x-auto min-h-screen">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className=" text-sm md:text-lg text-gray-700 capitalize bg-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Items quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="bg-white border-b hover:bg-slate-500 hover:text-white "
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        {++countRow}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap hover:underline cursor-pointer"
                        onClick={() => goToOrderDetails(order._id)}
                      >
                        {order._id}
                      </th>
                      <td
                        className={`px-6 py-4 capitalize ${
                          order.orderStatus === "Processing"
                            ? "text-red-500 "
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {order.orderStatus}
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(order.createAt)}
                      </td>
                      <td className="px-6 py-4">{order.orderItems.length}</td>
                      <td className="px-6 py-4">₹ {order.totalPrice}</td>
                      <td className="px-6 py-4">
                        <ul className="flex justify-around items-center">
                          <li
                            className={`text-sm md:text-lg hover:text-sky-500 ${
                              order.orderStatus === "Delivered"
                                ? "hidden"
                                : "block"
                            }`}
                            onClick={() => handleUpdateOrder(order)}
                          >
                            <FaEdit />
                          </li>
                          <li
                            className="text-sm md:text-lg"
                            onClick={() => handleDeleteOrderById(order)}
                          >
                            <FaTrash className="hover:text-red-500 cursor-pointer" />
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {showMessage && (
            <div className="fixed top-10 min-w-[300px] left-1/2 -translate-x-1/2 p-4 rounded-lg ring-slate-300 bg-white ring-1 shadow-md">
              <h1 className=" font-bold tracking-widest">Alert</h1>
              <p className="my-4 text-lg">{message}</p>
              <div className="w-full flex justify-between items-center">
                <button
                  className=" py-2 rounded-lg shadow-md hover:bg-green-700 px-4 bg-green-500"
                  onClick={() => handleAlertConfirm()}
                >
                  Yes
                </button>
                <button
                  className=" py-2 rounded-lg shadow-md hover:bg-red-700 px-4 bg-red-500"
                  onClick={() => handleAlertCancel()}
                >
                  No
                </button>
              </div>
            </div>
          )}
          {showUpdateOrder && (
            <UpdateOrderStatus
              IsOrder={IsOrder}
              setShowUpdateOrder={setShowUpdateOrder}
            />
          )}
        </>
      )}
    </>
  );
};

export default OrdersSection;
