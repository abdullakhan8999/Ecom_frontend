import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import your action here
import { FaEdit, FaStar, FaTrash } from "react-icons/fa"; // Import the star icon from React Icons
import {
  clearUserErrors,
  deleteReview,
  getAllReviews,
} from "../../../Actions/adminAction";
import Loader from "../../Loader";
import Rating from "../../common/Rating";
import showNotification from "../../../util/showNotification";

const ReviewsSection = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  let countRow = 0;
  const { isAuthenticated, user, loadingUser } = useSelector(
    (state) => state.user
  );

  const { reviews, ratings, adminLoading, status, error } = useSelector(
    (state) => state.admin
  );

  const [productId, setProductId] = useState("");
  const [hidden, setHidden] = useState("");

  useEffect(() => {
    if (!loadingUser && !isAuthenticated && user !== "admin") {
      navigation("/login");
    }
  }, [user, loadingUser, isAuthenticated, navigation]);
  // status(pin):

  useEffect(() => {
    if (error) {
      showNotification(error, "waring");
      dispatch(clearUserErrors());
    }
    if (status === "Review deleted successfully") {
      showNotification("Review deleted successfully", "info");
      dispatch(clearUserErrors());
    }
  }, [showNotification, status, error]);

  const handleGetReviews = async () => {
    if (productId === "") {
      showNotification("Please enter a valid product id", "waring");
      return;
    }
    setHidden(productId);
    dispatch(getAllReviews(productId));
    setProductId("");
  };

  const handleDeleteReviewById = async (review) => {
    await dispatch(deleteReview(hidden, review._id));
    await dispatch(getAllReviews(hidden));
  };

  return (
    <div className="">
      <div className="mb-4 bg-blue-500 flex gap-4 items-center justify-around flex-wrap font-bold  py-4 ">
        <div className="">
          <input
            type="text"
            placeholder="Enter Product ID"
            className="border p-2 w-64"
            value={productId}
            minLength={24}
            required
            onChange={(e) => setProductId(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 ml-2"
            onClick={handleGetReviews}
          >
            Get Reviews
          </button>
        </div>
        <p className=" md:text-2xl flex gap-4 text-white">
          Overall Rating: <Rating value={ratings && ratings} />
        </p>
      </div>
      {adminLoading ? (
        <Loader />
      ) : (
        <div className="relative overflow-x-auto min-h-screen">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-sm md:text-lg text-gray-700 capitalize bg-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S.No
                </th>
                <th scope="col" className="px-6 py-3">
                  Review ID
                </th>
                <th scope="col" className="px-6 py-3">
                  user
                </th>
                <th scope="col" className="px-6 py-3">
                  comment
                </th>
                <th scope="col" className="px-6 py-3">
                  rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews &&
                reviews.length > 0 &&
                reviews.map((review) => (
                  <tr
                    key={review._id}
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
                    >
                      {review._id}
                    </th>
                    <th className={`px-6 py-4 capitalize`}>{review.name}</th>
                    <th className="px-6 py-4">{review.comment}</th>
                    <td className="px-6 py-4">{review.rating}</td>
                    <td className="px-6 text-center py-4text-sm md:text-lg ">
                      <FaTrash
                        onClick={() => handleDeleteReviewById(review)}
                        className="cursor-pointer hover:text-red-500"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {reviews.length === 0 && (
            <p className="h-10 text-sm md:text-lg flex items-center justify-center bg-white w-full">
              No Reviews Found. Please enter a valid product id.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
