import React, { useState } from "react";
import { FaBoxes, FaImages, FaPlus, FaTimes } from "react-icons/fa";
import { popularCategories } from "../../../Constants/common";
import { adminUpdateProduct } from "../../../Actions/productActions";
import { useDispatch } from "react-redux";
import MetaData from "../../common/MetaData";

const ProductUpdateForm = ({ IsProduct, setShowUpdateForm }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: IsProduct.name || "",
    description: IsProduct.description || "",
    brand: IsProduct.brand || "",
    price: IsProduct.price || "",
    category: IsProduct.category || "",
    stock: IsProduct.stock || "",
  });

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState(IsProduct.images);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setShowUpdateForm(false);

    formData.images = [...images];

    dispatch(adminUpdateProduct(IsProduct._id, formData));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
      <MetaData title={`Update ${IsProduct.name} | MaNa Ecomm`} />
      <div className="bg-white mx-2 rounded-lg p-6 max-w-3xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <button
            onClick={() => setShowUpdateForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="flex flex-col md:flex-row items-start gap-4 justify-between">
            <label className="block mb-2  w-full md:w-1/2">
              <span className="font-semibold">Name:</span>
              <input
                type="text"
                className="border border-gray-300 rounded w-full p-1"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label className="block mb-2  w-full md:w-1/2">
              <span className="font-semibold">Brand:</span>
              <input
                type="text"
                className="border border-gray-300 rounded w-full p-1"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <label className="block mb-2">
            <span className="font-semibold">Description:</span>
            <textarea
              className="border border-gray-300 rounded w-full p-1"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>

          <div className="flex flex-col md:flex-row items-start gap-4 justify-between">
            <label className="block mb-2 w-full md:w-1/2">
              <span className="font-semibold">Price:</span>
              <input
                type="number"
                className="border border-gray-300 rounded w-full p-1"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="stock" className="block mb-2 w-full md:w-1/2">
              <span className="font-semibold">Stock:</span>
              <input
                type="number"
                id="stock"
                name="stock"
                className="border border-gray-300 rounded w-full p-1"
                placeholder="Product Stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>

          <label className="block mb-2">
            <span className="font-semibold">Category:</span>
            <select
              className="border border-gray-300 rounded w-full p-1"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              {popularCategories &&
                popularCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </label>

          <div className="mb-2">
            <label htmlFor="stock" className="font-semibold mb-2">
              Images:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaImages />
              </span>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                required
                onChange={createProductImagesChange}
                multiple
              />
            </div>
          </div>
          <label className="block mb-2">
            <span className="font-semibold">Product Preview:</span>
            <div className="relative py-2 flex items-center group justify-start flex-wrap gap-2 rounded-lg">
              {oldImages &&
                oldImages.length > 0 &&
                oldImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Product Image ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                ))}
            </div>
          </label>
          {imagesPreview.length > 0 && (
            <div className="mb-2">
              <label htmlFor="stock" className="block mb-2">
                Product Preview:
              </label>
              <div className="relative py-2 flex items-center justify-start flex-wrap gap-2 rounded-lg">
                {imagesPreview.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt="Product Preview"
                    className="w-20 h-20 object-cover"
                  />
                ))}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdateForm;
