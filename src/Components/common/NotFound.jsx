import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigator = useNavigate();
  return (
    <div className="max-w-screen-xl flex flex-wrap items-center h-screen justify-center mx-auto p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-3xl font-semibold mt-4">Page Not Found</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
          onClick={() => navigator("/")}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
