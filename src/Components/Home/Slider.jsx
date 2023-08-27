import React, { useEffect, useState } from "react";

const Slider = () => {
  const data = [
    {
      image:
        "https://res.cloudinary.com/dwpi8ryr2/image/upload/c_scale,h_1002,w_1920/v1684826315/Slides/slide-bg-1_acedb7.jpg",
      title: "Academy Cycle",
      description: "A high-quality cycle for your outdoor adventures.",
    },
    {
      image:
        "https://res.cloudinary.com/dwpi8ryr2/image/upload/c_scale,h_1002,w_1920/v1684826315/Slides/slide-bg-3_ksrciz.jpg",
      title: "Pink Hoodie",
      description: "Stay cozy and stylish with our comfortable pink hoodie.",
    },
    {
      image:
        "https://res.cloudinary.com/dwpi8ryr2/image/upload/v1684826318/Slides/slide-bg-2_njydjv.jpg",
      title: "White T-Shirt",
      description: "A classic white t-shirt for everyday wear.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="flex items-center justify-center w-full -z-10">
      <div className="w-full">
        <div className="relative group transition-opacity duration-500">
          <img
            src={data[currentIndex].image}
            alt={data[currentIndex].title}
            className="w-full h-auto "
          />
          <div
            className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          >
            <h2 className="text-sm md:text-lg font-bold text-white">
              {data[currentIndex].title}
            </h2>
            <p className="text-xs md:text-sm text-gray-300">
              {data[currentIndex].description}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            className="bg-white px-3 py-1 rounded-xl hover:ring-1 hover:bg-none text-sm md:text-lg font-bold hover:ring-slate-400 active:translate-y-1 duration-300 transition-all  text-gray-600"
          >
            &lt; Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-white px-3 py-1 rounded-xl hover:ring-1 hover:bg-none text-sm md:text-lg font-bold hover:ring-slate-400 active:translate-y-1 duration-300 transition-all  text-gray-600"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
