import React, { useState } from "react";
import MetaData from "../../common/MetaData";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetAllUsers,
  adminUpdateUserRole,
} from "../../../Actions/adminAction";

const UpdateUserStatus = ({ IsUser, setShowUpdateUser }) => {
  const dispatch = useDispatch();
  const { adminLoading } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    name: IsUser.name || "",
    email: IsUser.email || "",
    role: IsUser.role || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setShowUpdateUser(false);
    await dispatch(adminUpdateUserRole(IsUser._id, formData));
    await dispatch(adminGetAllUsers());
  };
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
      <MetaData title={`Update User Status | MaNa Ecomm`} />
      <div className="bg-white mx-2 rounded-lg p-6 max-w-3xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Update User Status</h2>
          <button
            onClick={() => setShowUpdateUser(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <form onSubmit={handleUpdateUser}>
          <label className="block mb-2">
            <span className="font-semibold">Status:</span>
            <select
              className="border border-gray-300 rounded w-full p-1"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="">Select User Status</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <button
            type="submit"
            disabled={adminLoading}
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600"
          >
            Update Role
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserStatus;
