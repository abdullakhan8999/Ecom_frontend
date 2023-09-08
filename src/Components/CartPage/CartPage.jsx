import React from "react";
import { FaCartArrowDown, FaPlus, FaMinus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../reducers/cartSlice";
import { toggleCart } from "../../reducers/cartVisibilitySlice";
import { useNavigate } from "react-router-dom";
import { addProductToCart } from "../../Actions/cartActions";
import showNotification from "../../util/showNotification";

const Cart = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isVisible = useSelector((state) => state.cartVisibility.isVisible);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleProductDetails = (item) => {
    navigate(`/product/${item.product}`);
    dispatch(toggleCart());
  };

  const handleIncreaseQuantity = (item) => {
    const newQty = item.quantity + 1;
    if (item.stock <= item.quantity) return;
    dispatch(addProductToCart(item.product, newQty));
  };

  const handleDecreaseQuantity = (item) => {
    const newQty = item.quantity - 1;
    if (newQty < 1) return;
    dispatch(addProductToCart(item.product, newQty));
  };
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart({ product: item.product }));
    showNotification(`${item.name} removed from cart`, "waring");
  };

  const handleCheckout = () => {
    navigate(isAuthenticated ? "/shipping" : "/login");
    dispatch(toggleCart());
  };

  const handleEmptyCart = () => {
    dispatch(toggleCart());
    navigate("/products");
  };
  return (
    <div
      className={`fixed top-0 right-0 z-30 h-screen w-full md:w-96 bg-white shadow-md transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300  `}
    >
      <div className="flex justify-between items-center px-4 py-3 bg-gray-800 text-white">
        <div className="flex gap-2 items-center ">
          <FaCartArrowDown size={24} className="text-xs" />
          <h2 className="text-lg font-semibold text-white">Cart</h2>
        </div>

        <button
          className="text-white hover:text-slate-300"
          onClick={() => {
            dispatch(toggleCart());
          }}
        >
          <MdClose size={24} />
        </button>
      </div>
      {cartItems.length === 0 ? (
        <div className="px-4 py-2">
          <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
          <p className="text-gray-600 text-sm">
            Your cart is empty. Please add some products to cart.
          </p>
          {/* send to products page  */}
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
            onClick={() => handleEmptyCart()}
          >
            Go to Products
          </button>
        </div>
      ) : (
        <>
          <div className="px-4 py-2">
            <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="flex justify-between items-start mb-2"
              >
                <div className="flex items-center cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="ml-2">
                    <p
                      className="text-sm font-semibold hover:underline"
                      onClick={() => handleProductDetails(item)}
                    >
                      {item.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-gray-500"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        <FaMinus size={16} />
                      </button>
                      <p className="text-gray-600 text-xs">{item.quantity}</p>
                      <button
                        className="text-gray-500"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        <FaPlus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center ">
                  <p className="text-sm font-semibold">
                    ₹ {item.price * item.quantity}
                  </p>
                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    <MdClose size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto p-4 bg-gray-100">
            <p className="text-lg font-semibold mb-2">Total Price</p>
            <p className="text-2xl font-bold">₹{totalPrice}</p>
            <button
              disabled={totalPrice === 0}
              onClick={() => handleCheckout()}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
