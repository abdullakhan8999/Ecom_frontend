import React from "react";
import ScrollToTop from "./ScrollToTop";
import { TbSquareRoundedArrowUpFilled } from "react-icons/tb";

const TakeToTop = () => {
  return (
    <button
      onClick={() => ScrollToTop()}
      className=" absolute -bottom-6 right-[-2.5rem] translate-x-[-100%] translate-y-[-100%] z-30 "
    >
      <TbSquareRoundedArrowUpFilled size={50} className="text-sky-500" />
    </button>
  );
};

export default TakeToTop;
