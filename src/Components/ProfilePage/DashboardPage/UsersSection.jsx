import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../../common/MetaData";
import Loader from "../../Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  adminDeleteUser,
  adminGetAllUsers,
  clearUserErrors,
} from "../../../Actions/adminAction";
import UpdateUserStatus from "./UpdateUserStatus.jsx";
import showNotification from "../../../util/showNotification";

const UsersSection = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [IsUser, setIsUser] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const { isAuthenticated, user, loadingUser } = useSelector(
    (state) => state.user
  );
  const { users, adminLoading, error, status } = useSelector(
    (state) => state.admin
  );

  // useEffect
  useEffect(() => {
    if (!loadingUser && !isAuthenticated && user !== "admin") {
      navigation("/login");
    }
  }, [user]);
  useEffect(() => {
    dispatch(adminGetAllUsers());
  }, []);
  useEffect(() => {
    if (error) {
      showNotification(error, "waring");
      dispatch(clearUserErrors());
    }
    if (
      status === "User deleted successfully!" ||
      status === "User role updated successfully"
    ) {
      showNotification(status, "info");
      dispatch(clearUserErrors());
    }
  }, [showNotification, status, error]);

  let countRow = 0;

  const handleDeleteUserById = (user) => {
    setMessage(`Are you sure you want to remove ${user.name}?`);
    setShowMessage(true);
    setIsUser(user);
  };

  const handleAlertCancel = () => {
    setShowMessage(false);
    setIsUser(null);
    setMessage(``);
  };

  const handleAlertConfirm = async () => {
    await dispatch(adminDeleteUser(IsUser._id));
    await dispatch(adminGetAllUsers());
    handleAlertCancel();
  };

  const handleUpdateUser = (user) => {
    setIsUser(user);
    setShowUpdateUser(true);
  };

  const goToUserDetails = (id) => {
    navigation(`/admin/user/${id}`);
  };

  return (
    <>
      <MetaData title={`Users | MaNa Ecomm`} />
      {adminLoading ? (
        <Loader />
      ) : (
        <>
          <p className="w-full mx-auto text-center md:text-2xl font-bold bg-blue-500 text-white py-4 ">
            Total Users: {users && users.length}
          </p>
          <div className="relative overflow-x-auto min-h-screen ">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className=" text-sm md:text-lg text-gray-700 capitalize bg-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.length > 0 &&
                  users.map((user) => (
                    <tr
                      key={user._id}
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
                        onClick={() => goToUserDetails(user._id)}
                      >
                        {user._id}
                      </th>
                      <td className="px-6 py-4">{user.name}</td>
                      <td
                        className={`px-6 py-4 capitalize ${
                          user.role === "admin" && "bg-green-500 text-white"
                        }`}
                      >
                        {user.role}
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <ul className="flex justify-around items-center">
                          <li
                            className={`text-sm md:text-lg hover:text-sky-500`}
                            onClick={() => handleUpdateUser(user)}
                          >
                            <FaEdit />
                          </li>
                          <li
                            className="text-sm md:text-lg hover:text-red-500"
                            onClick={() => handleDeleteUserById(user)}
                          >
                            <FaTrash />
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
          {showUpdateUser && (
            <UpdateUserStatus
              IsUser={IsUser}
              setShowUpdateUser={setShowUpdateUser}
            />
          )}
        </>
      )}
    </>
  );
};

export default UsersSection;
