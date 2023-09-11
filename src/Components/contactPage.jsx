import React, { useEffect, useState, useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./common/ScrollToTop";
import showNotification from "../util/showNotification";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import {
  clearUserErrors,
  createNewContact,
  deleteContact,
  getAllContacts,
} from "../Actions/contactsActions";

const ContactPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const checkboxRef = useRef(null);
  useEffect(() => {
    ScrollToTop();
  }, []);
  let countRow = 0;
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { contactsLoading, status, contacts } = useSelector(
    (state) => state.contacts
  );
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (user.role === "admin") {
      dispatch(getAllContacts());
    }
  }, [user]);

  useEffect(() => {
    if (
      status === "Message Sent Successfully" ||
      status === "Contact deleted successfully"
    ) {
      showNotification(status, "success");
      dispatch(clearUserErrors());
    }
  }, [status]);

  useEffect(() => {
    if (!isAuthenticated) {
      showNotification("Please Login to access this resource", "waring");
      navigation("/login");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createNewContact(formData));
    checkboxRef.current.checked = false;
    setFormData({ ...formData, message: "" });
    user.role === "admin" && (await dispatch(getAllContacts()));
  };

  const goToUserDetails = (id) => {
    navigation(`/admin/user/${id}`);
  };

  const handleDeleteContactById = async (id) => {
    await dispatch(deleteContact(id));
    await dispatch(getAllContacts());
  };

  return (
    <>
      {contactsLoading ? (
        <Loader />
      ) : (
        <div className="max-w-screen-xl h-screen  mx-auto p-4">
          <div className="bg-gray-100  py-12">
            <div className="container mx-auto p-4">
              <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        required
                        ref={checkboxRef}
                      />
                      <label
                        htmlFor="agree"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        I agree that you may contact me at the email address or
                        phone number above
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 active:outline-none active:ring active:ring-indigo-300"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {user.role === "admin" && contacts && contacts.length > 0 && (
            <>
              <p className="w-full mx-auto text-center md:text-2xl font-bold bg-blue-500 text-white py-4 ">
                Total Contacts: {contacts.length}
              </p>
              <div className="relative overflow-x-auto min-h-screen">
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
                        name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        message
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 flex items-center justify-center"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts &&
                      contacts.map((contact) => (
                        <tr
                          key={contact._id}
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
                            onClick={() => goToUserDetails(contact.userId)}
                          >
                            {contact.userId}
                          </th>
                          <td className={`px-6 py-4 capitalize `}>
                            {contact.name}
                          </td>
                          <td className="px-6 py-4">{contact.email}</td>
                          <td className="px-6 py-4">{contact.message}</td>
                          <td
                            className="px-6 flex items-center justify-center py-4 text-sm md:text-lg hover:text-red-500"
                            onClick={() => handleDeleteContactById(contact._id)}
                          >
                            <FaTrash className="hover:text-red-500 cursor-pointer" />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {/* {showMessage && (
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
              )} */}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ContactPage;
