import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaEyeSlash,
  FaLock,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import {
  clearUserErrors,
  clearUserMessage,
  login,
  register,
  userForgotPassword,
} from "../../Actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import showNotification from "../../util/showNotification";
import Loader from "../Loader";
import ScrollToTop from "../common/ScrollToTop";

const LoginSignUpPage = () => {
  useEffect(() => {
    ScrollToTop();
  }, []);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [forgotPasswordPopup, setForgotPasswordPopup] = useState(false);
  const { error, isAuthenticated, loadingUser, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error !== "Please Login to access this resource") {
      showNotification(error, "info");
      dispatch(clearUserErrors());
    }
    if (message) {
      showNotification(message, "info");
      dispatch(clearUserMessage());
    }
  }, [error, message]);
  useEffect(() => {
    if (isAuthenticated) {
      showNotification("Welcome to MaMa Ecomm", "info");
      navigation("/");
    }
  }, [isAuthenticated]);

  const handleToggle = () => {
    setShowLogin(!showLogin);
    setName("");
    setEmail("");
    setPassword("");
    setReEnteredPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showLogin) {
      await dispatch(login(email, password));
      setEmail("");
      setPassword("");
    } else {
      if (password === reEnteredPassword) {
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        await dispatch(register(myForm));
        ScrollToTop();
        setName("");
        setEmail("");
        setPassword("");
        setReEnteredPassword("");
      } else {
        showNotification("Passwords do not match", "info");
      }
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setEmail(email);
    setForgotPasswordPopup(true);
  };

  const handleSendOTP = async () => {
    dispatch(userForgotPassword(email));
    setEmail("");
    setForgotPasswordPopup(false);
    showNotification("Password reset link sent!", "success");
  };

  return (
    <>
      {loadingUser ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-start my-10 min-h-screen  bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              {showLogin ? "Log In" : "Sign Up"}
            </h2>
            <form onSubmit={handleSubmit}>
              {!showLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      id="name"
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button
                  className="text-xs text-gray-400 mt-2 hover:underline focus:text-blue-700"
                  onClick={handleForgotPasswordClick}
                >
                  {showLogin && "Forgot Password?"}
                </button>
              </div>
              {!showLogin && (
                <div className="mb-4">
                  <label htmlFor="reEnteredPassword" className="block mb-2">
                    Re-enter Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="reEnteredPassword"
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Re-enter Password"
                      value={reEnteredPassword}
                      onChange={(e) => setReEnteredPassword(e.target.value)}
                      required
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600"
              >
                {showLogin ? "Log In" : "Sign Up"}
              </button>
            </form>
            <p className="text-center mt-4">
              {showLogin ? (
                <span>
                  Don't have an account?{" "}
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={handleToggle}
                  >
                    Sign Up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={handleToggle}
                  >
                    Log In
                  </button>
                </span>
              )}
            </p>
          </div>
          {forgotPasswordPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white mx-2 p-8 rounded-lg shadow-md w-full md:w-[30%]">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setForgotPasswordPopup(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
                <div className="mb-4 w-full">
                  <label htmlFor="forgotEmail " className="block mb-2">
                    Enter your Email
                  </label>
                  <input
                    type="email"
                    id="forgotEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-2 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Email"
                    required
                  />
                </div>
                <button
                  type="button"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleSendOTP()}
                >
                  Send OTP
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LoginSignUpPage;
