import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../common/MetaData";
import Loader from "../Loader";
import { getMyOrders, getOrderDetails } from "../../Actions/orderActions";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { orderLoading, orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("Last 30 days");
  let countRow = 0;

  const filterDays = [
    "Last day",
    "Last 7 days",
    "Last 30 days",
    "Last month",
    "Last year",
  ];
  const [filteredOrders, setFilteredOrders] = useState([]);
  useEffect(() => {
    // Filter orders based on the selected filter and user ID
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createAt);
      const currentDate = new Date();

      // Check if the order's user ID matches the current user's ID
      const isMatchingUser = order.user === user._id;

      switch (filterBy) {
        case "Last day":
          return (
            (currentDate - orderDate) / (1000 * 60 * 60 * 24) <= 1 &&
            isMatchingUser
          );
        case "Last 7 days":
          return (
            (currentDate - orderDate) / (1000 * 60 * 60 * 24) <= 7 &&
            isMatchingUser
          );
        case "Last 30 days":
          return (
            (currentDate - orderDate) / (1000 * 60 * 60 * 24) <= 30 &&
            isMatchingUser
          );
        case "Last month":
          const lastMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
          );
          return orderDate >= lastMonth && isMatchingUser;
        case "Last year":
          const lastYear = new Date(
            currentDate.getFullYear() - 1,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          return orderDate >= lastYear && isMatchingUser;
        default:
          return isMatchingUser;
      }
    });

    // Set the filtered orders
    setFilteredOrders(filtered);
  }, [filterBy, orders, user._id]);

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const goToOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
    navigation(`/order/${orderId}`);
  };

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }
  const handleFilerBY = (day) => {
    setFilterBy(day);
    setIsDropdownOpen(false);
  };
  return (
    <>
      <MetaData title="My Orders | MaNa Ecomm" />
      <div className="max-w-screen-xl mx-auto p-4 min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">{user.name} - Orders</h2>
        {orderLoading ? (
          <Loader />
        ) : (
          <div className="relative overflow-x-auto min-h-screen  sm:rounded-lg">
            <div className="flex items-center justify-between pb-4">
              <div className="relative">
                <button
                  id="dropdownRadioButton"
                  data-dropdown-toggle="dropdownRadio"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                  onClick={toggleDropdown}
                >
                  <svg
                    className="w-3 h-3 text-gray-500  mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                  </svg>
                  {filterBy}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div
                    id="dropdownRadio"
                    className={`z-10 ${
                      !isDropdownOpen ? "hidden" : "absolute"
                    } w-48 bg-white divide-y divide-gray-100 rounded-lg shadow z-30`}
                    data-popper-reference-hidden=""
                    data-popper-escaped=""
                    data-popper-placement="top"
                  >
                    <ul
                      className="p-3  space-y-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownRadioButton"
                    >
                      {filterDays.map((day) => (
                        <li key={day}>
                          <div
                            className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                            onClick={() => handleFilerBY(day)}
                          >
                            <input
                              id="filter-radio-example-1"
                              type="radio"
                              checked={day === filterBy}
                              defaultValue=""
                              name="filter-radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                            />
                            <label
                              htmlFor="filter-radio-example-1"
                              className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {day}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
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
                {filteredOrders &&
                  filteredOrders.map((order) => (
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
                      <td className="px-6 py-4">{order.orderItems.length}</td>
                      <td className="px-6 py-4">₹ {order.totalPrice}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <p className="h-10 text-xs md:text-sm flex items-center justify-center bg-white w-full">
                No orders!
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
