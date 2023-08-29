import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaEyeSlash, FaLock, FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login, register } from "../../Actions/userActions";
import { useNavigate } from "react-router-dom";
import showNotification from "../../util/showNotification";
import Loader from "../Loader";
import ScrollToTop from "../common/ScrollToTop";

const LoginSignUpPage = () => {
  useEffect(() => {
    ScrollToTop();
  }, []);

  //  abdullakhan8999@gmail.com
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const { error, isAuthenticated, loadingUser } = useSelector(
    (state) => state.user
  );

  // useEffect
  useEffect(() => {
    if (error) {
      showNotification(error, "info");
    }
  }, [error]);
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

        await myForm.set("name", name);
        await myForm.set("email", email);
        await myForm.set("password", password);
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
  return (
    <>
      {loadingUser ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center my-10 min-h-full bg-gray-100">
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
        </div>
      )}
    </>
  );
};

export default LoginSignUpPage;
