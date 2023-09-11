import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Logo from "../assets/logo.png";

const AboutUsPage = () => {
  return (
    <div className="max-w-screen-xl flex flex-wrap items-start h-screen justify-center mx-auto p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <img
          src={Logo}
          alt="Company Logo"
          className="mx-auto w-32 h-32 rounded-full"
        />
        <h1 className="text-3xl font-semibold mt-4">Patan Abdulla Khan</h1>
        <p className="text-gray-700 mt-2">
          Front-end Developer with a passion for creating beautiful and
          user-friendly websites. Skilled in React, JavaScript, Tailwind CSS and
          HTML.
        </p>
        <div className="mt-4">
          <p className="text-gray-700">Connect with me:</p>
          <div className="flex space-x-2 font-bold text-lg mt-2">
            <a href="https://github.com/abdullakhan8999" target="_blank">
              <FaGithub className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </a>
            <a href="linkedin.com/in/abdullakhan8999/" target="_blank">
              <FaLinkedin className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </a>
            <a href="mailto:abdullakhan8999@gmail.com" target="_blank">
              <SiGmail className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
