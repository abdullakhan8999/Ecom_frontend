import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  adminGetAllProducts,
  clearProductErrors,
} from "../../../Actions/productActions";
import MetaData from "../../common/MetaData";
import { FaBoxes, FaImages } from "react-icons/fa";
import { HiCurrencyRupee } from "react-icons/hi";
import {
  MdCategory,
  MdDriveFileRenameOutline,
  MdOutlineDescription,
} from "react-icons/md";
import { popularCategories } from "../../../Constants/common";
import showNotification from "../../../util/showNotification";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";

const CreateProductPage = ({ setProductPanels, productPanels }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { productLoading, error, status } = useSelector(
    (state) => state.product
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
  });

  const { name, description, brand, price, stock, category } = productData;

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      showNotification(error, "warning");
      dispatch(clearProductErrors());
    }
    if (status === "new Product Added") {
      showNotification("Product Created Successfully", "info");
      dispatch(adminGetAllProducts());
      dispatch(clearProductErrors());
      setProductPanels("products");
    }
  }, [dispatch, setProductPanels, showNotification, error, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    productData.images = [...images];

    dispatch(addNewProduct(productData));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
    <>
      {productLoading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="Create Product | MaNa Ecomm" />
          <div className="max-w-3xl mx-auto mt-4 p-6">
            <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row items-start gap-4 justify-between">
                <div className="mb-4 w-full md:w-1/2">
                  <label htmlFor="name" className="block mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <MdDriveFileRenameOutline />
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Product Name"
                      value={productData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 w-full md:w-1/2">
                  <label htmlFor="price" className="block mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <HiCurrencyRupee />
                    </span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      step="0.01"
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Product Price"
                      value={productData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">
                  Description
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400">
                    <MdOutlineDescription />
                  </span>
                  <textarea
                    id="description"
                    name="description"
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Product Description"
                    value={productData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-4 justify-between">
                <div className="mb-4 w-full md:w-1/2">
                  <label htmlFor="category" className="block mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <MdCategory />
                    </span>
                    <select
                      id="category"
                      name="category"
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                      value={productData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      {popularCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4 w-full md:w-1/2">
                  <label htmlFor="stock" className="block mb-2">
                    Stock
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaBoxes />
                    </span>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Product Stock"
                      value={productData.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="stock" className="block mb-2">
                  Images
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
              {imagesPreview.length > 0 && (
                <div className="mb-4">
                  <label htmlFor="stock" className="block mb-2">
                    Product Preview
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
                disabled={productLoading ? true : false}
                onClick={(e) => handleSubmit(e)}
                className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProductPage;
