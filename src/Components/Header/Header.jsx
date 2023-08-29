import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaCartArrowDown,
  FaHome,
  FaBoxOpen,
  FaInfoCircle,
  FaPhone,
  FaShoppingCart,
  FaListAlt,
} from "react-icons/fa";
import { BiLogOut, BiLogIn, BiSolidDashboard, BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Actions/userActions";
import { ImMenu } from "react-icons/im";

const Header = () => {
  // state and constants
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(window.innerWidth > 940);
  const [isJobsDropdownOpen, setIsJobsDropdownOpen] = useState(false);
  const [isCompanyCategoriesDropdownOpen, setIsCompanyCategoriesDropdownOpen] =
    useState(false);
  const { user, loadingUser, status, token, error, isAuthenticated } =
    useSelector((state) => state.user);

  // useEffects
  useEffect(() => {
    const handleResize = () => {
      setIsSearchOpen(window.innerWidth > 940);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // functions
  const handleSearch = (event) => {
    setSearchQuery(searchText);
  };
  const toggleJobsDropdown = () => {
    setIsJobsDropdownOpen(!isJobsDropdownOpen);
    setIsCompanyCategoriesDropdownOpen(false);
  };
  const toggleCompanyCategoriesDropdown = () => {
    setIsJobsDropdownOpen(false);
    setIsCompanyCategoriesDropdownOpen(!isCompanyCategoriesDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    dispatch(logoutUser());
  };
  const orders = () => {
    setIsDropdownOpen(false);
    navigation("/orders");
  };
  const account = () => {
    setIsDropdownOpen(false);
    navigation("/profile");
  };
  const dashboard = () => {
    setIsDropdownOpen(false);
    navigation("/dashboard");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const options = [
    { icon: <FaUserCircle />, name: "Profile", func: account },
    { icon: <FaListAlt />, name: "Orders", func: orders },
    { icon: <BiLogOut />, name: "Logout", func: handleLogout },
  ];
  if (user && user.role === "admin") {
    options.unshift({
      icon: <BiSolidDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center font-bold text-lg min-w-940:text-2xl hover:text-sky-400"
          >
            <FaShoppingCart size={24} className=" text-xs mr-2" />
            MaNa Ecomm
          </Link>
          <div
            className={`fixed top-24 -translate-x-1/2  left-1/2 min-w-940:relative min-w-940:translate-x-0  min-w-940:top-auto  min-w-940:left-auto  ${
              isSearchOpen ? "block" : "hidden"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full min-w-[250px] z-10 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                //   onKeyDown={handleSearch}
              />
            </div>
          </div>
          <div className="flex">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              type="button"
              className="min-w-940:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 text-sm p-2.5 mr-1 rounded-lg"
              aria-controls="navbar-search"
              aria-expanded={isSearchOpen}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg min-w-940:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-default"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full min-w-940:block min-w-940:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-wrap items-center justify-center p-4 min-w-940:p-0 mt-4 min-w-940:flex-row min-w-940:space-x-8 min-w-940:mt-0 min-w-940:border-0 min-w-940:bg-white">
              <li>
                <Link
                  to="/"
                  title={user && user.name}
                  className="block py-2 pl-3 pr-4 min-w-940:px-0 font-bold text-gray-900 rounded hover:bg-gray-100 min-w-940:hover:bg-transparent min-w-940:border-0 min-w-940:hover:text-blue-700 min-w-940:p-0"
                >
                  <div className="flex flex-col items-center group">
                    <FaHome id="home-navbar" size={24} className=" text-xs" />
                    <label
                      htmlFor="home-navbar"
                      className=" text-xs font-bold group-hover:underline "
                    >
                      Home
                    </label>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  //  title={user && user.name}
                  className="block py-2 pl-3 pr-4 min-w-940:px-0 font-bold text-gray-900 rounded hover:bg-gray-100 min-w-940:hover:bg-transparent min-w-940:border-0 min-w-940:hover:text-blue-700 min-w-940:p-0"
                >
                  <div className="flex flex-col items-center group">
                    <FaBoxOpen
                      id="products-navbar"
                      size={24}
                      className=" text-xs"
                    />
                    <label
                      htmlFor="products-navbar"
                      className=" text-xs font-bold group-hover:underline"
                    >
                      Products
                    </label>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  //  title={user && user.name}
                  className="block py-2 pl-3 pr-4 min-w-940:px-0 font-bold text-gray-900 rounded hover:bg-gray-100 min-w-940:hover:bg-transparent min-w-940:border-0 min-w-940:hover:text-blue-700 min-w-940:p-0"
                >
                  <div className="flex flex-col items-center group">
                    <FaPhone
                      id="contact-navbar"
                      size={24}
                      className=" text-xs"
                    />
                    <label
                      htmlFor="contact-navbar"
                      className=" text-xs font-bold group-hover:underline"
                    >
                      Contact
                    </label>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  //  title={user && user.name}
                  className="block py-2 pl-3 pr-4 min-w-940:px-0 font-bold text-gray-900 rounded hover:bg-gray-100 min-w-940:hover:bg-transparent min-w-940:border-0 min-w-940:hover:text-blue-700 min-w-940:p-0"
                >
                  <div className="flex flex-col items-center group">
                    <FaInfoCircle
                      id="about-navbar"
                      size={24}
                      className=" text-xs"
                    />
                    <label
                      htmlFor="about-navbar"
                      className=" text-xs font-bold group-hover:underline "
                    >
                      About
                    </label>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  //  title={user && user.name}
                  className="block py-2 pl-3 pr-4 min-w-940:px-0 text-gray-900 rounded hover:bg-gray-100 min-w-940:hover:bg-transparent min-w-940:border-0 min-w-940:hover:text-blue-700 min-w-940:p-0"
                >
                  <div className="flex flex-col items-center group">
                    <FaCartArrowDown
                      id="Cart-navbar"
                      size={24}
                      className=" text-xs"
                    />
                    <label
                      htmlFor="Cart-navbar"
                      className=" text-xs font-bold group-hover:underline "
                    >
                      Cart
                    </label>
                  </div>
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  {/* <Link
                      to="/user"
                      //  title={user && user.name}
                      className="block py-2 pl-3 pr-4 min-w-940:px-0 text-gray-900 rounded hover:bg-gray-100 min-w-940:hover:bg-transparent min-w-940:border-0 min-w-940:hover:text-blue-700 min-w-940:p-0"
                    >
                      <div className="flex flex-col items-center group">
                        <FaUserCircle
                          id="User-navbar"
                          size={24}
                          className=" text-xs"
                        />
                        <label
                          htmlFor="User-navbar"
                          className=" text-xs font-bold group-hover:underline "
                        >
                          User
                        </label>
                      </div>
                    </Link> */}
                  <div
                    className="relative inline-block md:pl-0 pl-4"
                    ref={dropdownRef}
                  >
                    <button
                      type="button"
                      className="flex items-center flex-col mr-3  md:mr-0 "
                      onClick={toggleDropdown}
                    >
                      {/* <span className="sr-only">Open user menu</span> */}
                      <ImMenu
                        id="user-menu-button"
                        className="  focus:ring-4  text-gray-900 focus:ring-gray-300 text-xs"
                        size={24}
                      />
                      <label
                        htmlFor="user-menu-button"
                        className=" text-xs font-bold group-hover:underline "
                      >
                        Menu
                      </label>
                    </button>
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                      <div className="z-50 absolute right-0 mt-2 ring-1 ring-slate-300 w-44 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow">
                        <div className="px-4 py-3">
                          <span className="block text-sm text-gray-900">
                            {user && user.name}
                          </span>
                          <span className="block text-sm text-gray-500 truncate">
                            {user && user.email}
                          </span>
                        </div>
                        <div className="h-[2px] w-full bg-slate-200 rounded-full"></div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                          {/* <li>
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <div className="flex items-center justify-start gap-x-2">
                                  <BiSolidDashboard />
                                  Dashboard
                                </div>
                              </a>
                            </li> */}
                          {options.map((option) => (
                            <li
                              key={option.name}
                              className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 "
                              onClick={() => option.func()}
                            >
                              <div className="flex items-center justify-start gap-x-2">
                                {option.icon}
                                {option.name}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block py-2 pl-3 pr-4 min-w-940:px-0 text-gray-900 rounded hover:bg-gray-100 min-w-940:hover:bg-transparent min-w-940:border-0 min-w-940:hover:text-blue-700 min-w-940:p-0"
                    >
                      <div className="flex flex-col items-center group">
                        <BiLogIn
                          id="login-navbar"
                          size={24}
                          className="text-xs"
                        />
                        <label
                          htmlFor="login-navbar"
                          className=" text-xs font-bold group-hover:underline "
                        >
                          Login
                        </label>
                      </div>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
