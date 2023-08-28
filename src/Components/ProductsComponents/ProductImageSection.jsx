import React, { useEffect, useState } from "react";

const ProductImageSection = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);
  const displayedImages = images.slice(0, 3);
  return (
    <section className="flex items-center md:justify-around  gap-4 md:flex-row  flex-col-reverse w-full">
      <div className="object-contain  flex flex-row md:flex-col gap-2">
        {displayedImages.map((curElm, index) => {
          return (
            <figure key={index}>
              <img
                src={curElm.url}
                alt={curElm.Public_id}
                className="max-w-[100px] max-h-[150px] cursor-pointer"
                onClick={() => setMainImage(curElm)}
              />
            </figure>
          );
        })}
      </div>
      <div className="object-contain ">
        <img
          src={mainImage.url}
          alt={mainImage.Public_id}
          className=" max-w-[400px] max-h-[400px]"
        />
      </div>
    </section>
  );
};

export default ProductImageSection;
