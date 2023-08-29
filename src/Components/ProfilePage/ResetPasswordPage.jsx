import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaLock, FaEye } from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";
import { clearUserErrors, resetNewPassword } from "../../Actions/userActions";
import showNotification from "../../util/showNotification";
import Loader from "../Loader";

const ResetPasswordPage = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const { error, status, loadingUser } = useSelector((state) => state.user);

  const [newPassword, setNewPassword] = useState("");
  const [reEnterNewPassword, setReEnterNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error !== "Please Login to access this resource") {
      showNotification(error, "warring");
      dispatch(clearUserErrors());
    }
    if (status === "success") {
      showNotification("Password changed successfully", "success");
      navigation("/login");
    }
  }, [error, status, navigation, dispatch, showNotification]);

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (newPassword !== reEnterNewPassword) {
      showNotification("Passwords do not match. Please re-enter.", "info");
      return;
    }
    const passwordObj = {
      password: newPassword,
      confirmPassword: reEnterNewPassword,
    };

    dispatch(resetNewPassword(token, passwordObj));
    setNewPassword("");
    setReEnterNewPassword("");
    setShowPassword(false);
  };

  return (
    <>
      {loadingUser ? (
        <Loader />
      ) : (
        <div className="max-w-screen-xl mx-auto p-4 min-h-screen">
          <div className=" bg-white mx-auto md:w-[400px] shadow-lg rounded-lg p-4">
            <div className="bg-white mx-2 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <form onSubmit={handleResetPassword}>
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
                  <span className="font-semibold">Re-enter New Password:</span>
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
        </div>
      )}
    </>
  );
};

export default ResetPasswordPage;
