import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
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
          user-friendly websites. Skilled in HTML, CSS, JavaScript, and React.
        </p>
        <div className="mt-4">
          <p className="text-gray-700">Connect with me:</p>
          <div className="flex space-x-2 mt-2">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </a>
            <a
              href="https://linkedin.com/in/yourname"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </a>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
