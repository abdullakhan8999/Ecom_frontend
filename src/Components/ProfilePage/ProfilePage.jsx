import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUser,
  FaEdit,
  FaTimes,
  FaEyeSlash,
  FaLock,
  FaEye,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import {
  changeUserPassword,
  clearUserErrors,
  updateUserProfile,
} from "../../Actions/userActions";
import showNotification from "../../util/showNotification";

const ProfilePage = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, error, loadingUser, status } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (!loadingUser && !isAuthenticated) {
      navigation("/login");
    }
  }, [user]);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterNewPassword, setReEnterNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      showNotification(error, "warring");
      dispatch(clearUserErrors());
    }
    if (status === "password_changed") {
      showNotification("Password changed successfully", "success");
    }
    if (status === "profile_updated") {
      showNotification("Profile updated successfully", "success");
    }
  }, [error, status]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseClick = () => {
    setOldPassword("");
    setNewPassword("");
    setShowPassword(false);
    setReEnterNewPassword("");
    setIsEditing(false);
    setIsChangePasswordOpen(false);
  };

  const handlePasswordChangeClick = () => {
    setIsChangePasswordOpen(true);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    // Dispatch the updateUserProfile action
    dispatch(
      updateUserProfile({
        name: username || user.name,
        email: email || user.email,
      })
    );

    setIsEditing(false);
  };

  const handlePasswordUpdate = (event) => {
    event.preventDefault();

    if (newPassword !== reEnterNewPassword) {
      showNotification("Passwords do not match. Please re-enter.", "info");
      return;
    }

    dispatch(changeUserPassword({ oldPassword, newPassword }));
    setOldPassword("");
    setNewPassword("");
    setReEnterNewPassword("");
    setShowPassword(false);
    setIsChangePasswordOpen(false);
  };

  const handleMyOrders = () => {
    navigation("/orders");
  };

  return (
    <>
      {loadingUser ? (
        <Loader />
      ) : (
        <div className="max-w-screen-xl mx-auto p-4 min-h-screen">
          <div className="bg-white mx-auto md:w-[50%] shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaUser className="text-4xl mr-2 text-gray-500" />
              <h2 className="text-2xl font-semibold">My Profile</h2>
              <button
                onClick={handleEditClick}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <FaEdit />
              </button>
            </div>
            <p className="text-gray-600">Name: {user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>
            <div className="mt-4 flex items-center gap-y-2 flex-wrap">
              <button
                onClick={handlePasswordChangeClick}
                className="bg-blue-500 text-white w-full whitespace-nowrap md:w-min px-4 py-2 rounded md:mr-2"
              >
                Change Password
              </button>
              <button
                className="bg-blue-500 text-white w-full whitespace-nowrap md:w-min px-4 py-2 rounded"
                onClick={() => handleMyOrders()}
              >
                My Orders
              </button>
            </div>
          </div>
          {isEditing && (
            <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white mx-2 rounded-lg p-6">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={handleCloseClick}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <form onSubmit={handleUpdate}>
                  <label className="block mb-2">
                    <span className="font-semibold">Username:</span>
                    <input
                      type="text"
                      className="border border-gray-300 rounded w-full p-1"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="font-semibold">Email:</span>
                    <input
                      type="email"
                      className="border border-gray-300 rounded w-full p-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          )}
          {isChangePasswordOpen && (
            <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white mx-2 rounded-lg p-6">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={handleCloseClick}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <form onSubmit={handlePasswordUpdate}>
                  <label className="block ">
                    <span className="font-semibold">Old Password:</span>
                  </label>
                  <div className="relative mb-2">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <label className="block ">
                    <span className="font-semibold">New Password:</span>
                  </label>
                  <div className="relative mb-2">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <label className="block">
                    <span className="font-semibold">
                      Re-enter New Password:
                    </span>
                  </label>
                  <div className="relative  mb-2">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                      value={reEnterNewPassword}
                      onChange={(e) => setReEnterNewPassword(e.target.value)}
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
