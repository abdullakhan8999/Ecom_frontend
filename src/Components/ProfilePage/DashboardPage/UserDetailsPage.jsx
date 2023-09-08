import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader";
import { clearUserErrors } from "../../../Actions/userActions";
import showNotification from "../../../util/showNotification";
import ScrollToTop from "../../common/ScrollToTop";
import MetaData from "../../common/MetaData";
import { adminGetUserDetails } from "../../../Actions/adminAction";
import {
  AdminGetAllOrders,
  getOrderDetails,
} from "../../../Actions/orderActions";

const UserDetailsPage = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  let countRow = 0;
  const { user, error, adminLoading } = useSelector((state) => state.admin);
  const { orders, orderLoading } = useSelector((state) => state.orders);
  const {
    isAuthenticated,
    loadingUser,
    user: admin,
  } = useSelector((state) => state.user);
  // useEffect
  useEffect(() => {
    if (!loadingUser && !isAuthenticated && admin.role !== "admin") {
      navigation("/login");
    }
  }, [user, loadingUser, isAuthenticated]);
  // useEffect
  useEffect(() => {
    ScrollToTop();
    dispatch(adminGetUserDetails(id));
  }, []);

  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    if (error) {
      showNotification(error, "warring");
      dispatch(clearUserErrors());
    }
  }, [error]);

  const handleMyOrders = () => {
    setShowOrder(!showOrder);
    dispatch(AdminGetAllOrders());
  };

  const goToOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
    navigation(`/order/${orderId}`);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const [userOrders, setUserOrders] = useState(0);
  useEffect(() => {
    orders.map((order) => {
      order.user === id && setUserOrders(1 + userOrders);
    });
  }, [orders]);

  return (
    <>
      {adminLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile | MaNa Ecomm`} />
          <div className="max-w-screen-xl mx-auto p-4 min-h-screen">
            <div className="bg-white mx-auto shadow-lg rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FaUser className="text-4xl mr-2 text-gray-500" />
                <h2 className="text-2xl font-semibold">{user.name}</h2>
              </div>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Role: {user.role}</p>
              <div className="mt-4 flex items-center gap-y-2 flex-wrap">
                <button
                  className="bg-blue-500 text-white w-full whitespace-nowrap md:w-min px-4 py-2 rounded"
                  onClick={() => handleMyOrders()}
                >
                  User Orders
                </button>
              </div>
              {showOrder && (
                <>
                  <table className="w-full text-sm mt-8 text-left text-gray-500 ">
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
                      </tr>
                    </thead>
                    <tbody>
                      {orders &&
                        orders.length > 0 &&
                        orders.map(
                          (order) =>
                            order.user === id && (
                              <tr
                                key={order._id}
                                className="bg-white border-b hover:bg-slate-500 hover:text-white cursor-pointer"
                                onClick={() => goToOrderDetails(order._id)}
                              >
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium whitespace-nowrap"
                                >
                                  {++countRow}
                                </th>
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium whitespace-nowrap"
                                >
                                  {order._id}
                                </th>
                                <td
                                  className={`px-6 py-4 ${
                                    order.orderStatus === "Processing"
                                      ? "text-red-500"
                                      : "bg-green-500"
                                  }`}
                                >
                                  {order.orderStatus}
                                </td>
                                <td className="px-6 py-4">
                                  {formatDate(order.createAt)}
                                </td>
                                <td className="px-6 py-4">
                                  {order.orderItems.length}
                                </td>
                                <td className="px-6 py-4">
                                  ₹ {order.totalPrice}
                                </td>
                              </tr>
                            )
                        )}
                    </tbody>
                  </table>
                  {userOrders === 0 && (
                    <p className="h-10 text-sm md:text-lg flex items-center justify-center bg-white w-full">
                      No orders!
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetailsPage;
