import React from "react";

const NewsletterSubscription = () => {
  return (
    <div className="flex w-full py-8 my-4 items-center flex-wrap justify-between p-4 bg-white">
      <div className="max-w-[70%]">
        <h3 className="text-xl font-semibold mb-2">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-gray-600">
          Stay updated with the latest news, offers, and promotions. Don't miss
          out on any exciting updates from us!
        </p>
      </div>
      <div className="mt-4 flex gap-2 items-center justify-between flex-wrap">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-48 p-2 border rounded-lg mr-2 "
        />
        <button className="bg-blue-500  text-white px-4 py-2 rounded-lg ">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
