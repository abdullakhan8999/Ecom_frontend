import React, { useState } from "react";
import MetaData from "../../common/MetaData";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetAllOrders, updateOrder } from "../../../Actions/orderActions";

const UpdateOrderStatus = ({ IsOrder, setShowUpdateOrder }) => {
  const dispatch = useDispatch();
  const { orderLoading } = useSelector((state) => state.orders);
  const [formData, setFormData] = useState({
    status: "",
  });
  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    setShowUpdateOrder(false);
    await dispatch(updateOrder(IsOrder._id, formData));
    await dispatch(AdminGetAllOrders());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
      <MetaData title={`Update Order Status  | MaNa Ecomm`} />
      <div className="bg-white mx-2 rounded-lg p-6 max-w-3xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Update Order Status</h2>
          <button
            onClick={() => setShowUpdateOrder(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <form onSubmit={handleUpdateOrder}>
          <label className="block mb-2">
            <span className="font-semibold">Order Status:</span>
            <select
              className="border border-gray-300 rounded w-full p-1"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="">Select Order Status</option>
              {IsOrder.orderStatus === "Processing" && (
                <option value="Shipped">Shipped</option>
              )}
              {IsOrder.orderStatus === "Shipped" && (
                <option value="Delivered">Delivered</option>
              )}
            </select>
          </label>
          <button
            type="submit"
            disabled={orderLoading}
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrderStatus;
