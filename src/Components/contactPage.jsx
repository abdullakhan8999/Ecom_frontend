import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your logic to handle form submission here
    console.log(formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto p-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
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
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
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
                />
                <label
                  htmlFor="agree"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree that you may contact me at the email address or phone
                  number above
                </label>
              </div>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
