import { FaEye, FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import MetaData from "../../common/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteProduct,
  adminGetAllProducts,
  clearProductErrors,
} from "../../../Actions/productActions";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import showNotification from "../../../util/showNotification";
import UpdateProductDetails from "./UpdateProductDetails.jsx";
import CreateProductPage from "./CreateProductPage";

const ProductsSection = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { isAuthenticated, user, loadingUser } = useSelector(
    (state) => state.user
  );
  // useEffect
  useEffect(() => {
    if (!loadingUser && !isAuthenticated && user !== "admin") {
      navigation("/login");
    }
  }, [user]);
  const [message, setMessage] = useState("second");
  const [showMessage, setShowMessage] = useState(false);
  const [productSectionLoading, setProductSectionLoading] = useState(false);
  const [IsProduct, setIsProduct] = useState(null);
  const { productLoading, error, status } = useSelector(
    (state) => state.product
  );
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productPanels, setProductPanels] = useState("products");
  const { products, productsLoading, productsCount } = useSelector(
    (state) => state.products
  );

  let countRow = 0;
  useEffect(() => {
    dispatch(adminGetAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productsLoading || productLoading) {
      setProductSectionLoading(true);
    } else {
      setProductSectionLoading(false);
    }
  }, [productsLoading, productLoading, productSectionLoading]);

  useEffect(() => {
    if (error) {
      showNotification(error, "warning");
      dispatch(clearProductErrors());
    }
    if (status === "successfully Updated") {
      showNotification("Product Updated Successfully", "info");
      dispatch(adminGetAllProducts());
      dispatch(clearProductErrors());
      setProductPanels("products");
    }
  }, [dispatch, setProductPanels, showNotification, error, status]);

  const goToProductDetails = (id) => {
    navigation(`/product/${id}`);
  };

  const handleDeleteProductById = (product) => {
    setMessage(`Are you sure you want to delete this ${product.name}?`);
    setShowMessage(!showMessage);
    setIsProduct(product);
  };

  const handleAlertCancel = () => {
    setShowMessage(false);
    setMessage(``);
    setIsProduct(null);
  };

  const handleAlertConfirm = async () => {
    await dispatch(adminDeleteProduct(IsProduct._id));
    await dispatch(adminGetAllProducts());
    status === "successfully deleted" && showNotification(status, "info");
    handleAlertCancel();
  };

  const handleUpdateProductDetails = async (product) => {
    setIsProduct(product);
    setShowUpdateForm(true);
  };

  return (
    <>
      {productSectionLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Products List | Admin - MaNa Ecomm"} />
          <div className="overflow-x-auto">
            <div className="w-full flex items-center justify-around gap-8 mx-auto text-center md:text-2xl font-bold bg-blue-500 text-white py-4 ">
              <p
                className="hover:ring-1 hover:ring-slate-300 cursor-pointer p-2 rounded-lg"
                onClick={() => setProductPanels("products")}
              >
                Total Products: {productsCount} No's
              </p>
              <div
                className="group"
                title="Add New Product"
                onClick={() => setProductPanels("createNewProductPanel")}
              >
                <p className="flex items-center justify-center gap-2 group-hover:ring-1 rounded-lg group-hover:ring-slate-300 cursor-pointer p-2 ">
                  <FaPlus className="text-slate-900 group-hover:text-slate-300" />{" "}
                  Add new Product
                </p>
              </div>
            </div>
            {productPanels === "products" ? (
              <div className="">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className=" text-sm md:text-lg text-gray-700 uppercase bg-gray-300">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Stock
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.length > 0 &&
                      products.map((product) => (
                        <tr
                          key={product._id}
                          className="bg-white text-sm border-b hover:bg-slate-500 hover:text-white cursor-pointer"
                        >
                          <th
                            scope="row"
                            className="px-6 text-center py-4 font-medium whitespace-nowrap"
                          >
                            {++countRow}
                          </th>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium whitespace-nowrap hover:underline"
                            onClick={() => goToProductDetails(product._id)}
                          >
                            {product._id}
                          </th>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium whitespace-nowrap hover:underline"
                            onClick={() => goToProductDetails(product._id)}
                          >
                            {product.name}
                          </th>
                          <td
                            className={` text-white text-center px-6 py-4 ${
                              product.stock === 0
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                          >
                            {product.stock}
                          </td>
                          <td className="px-6 py-4">₹ {product.price}</td>
                          <td className="px-6 py-4">
                            <ul className="flex justify-around items-center">
                              <li
                                className="text-sm md:text-lg hover:text-sky-500"
                                onClick={() =>
                                  handleUpdateProductDetails(product)
                                }
                              >
                                <FaEdit />
                              </li>
                              <li
                                className="text-sm md:text-lg hover:text-red-500"
                                onClick={() => handleDeleteProductById(product)}
                              >
                                <FaTrash />
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {productsCount === 0 && (
                  <p className="h-10 text-sm md:text-lg flex  bg-gray-200 items-center justify-center w-full">
                    No Products!
                  </p>
                )}
              </div>
            ) : (
              <div className="">
                <CreateProductPage
                  setProductPanels={setProductPanels}
                  productPanels={productPanels}
                />
              </div>
            )}
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
          {showUpdateForm && (
            <UpdateProductDetails
              IsProduct={IsProduct}
              setShowUpdateForm={setShowUpdateForm}
            />
          )}
        </>
      )}
    </>
  );
};

export default ProductsSection;
