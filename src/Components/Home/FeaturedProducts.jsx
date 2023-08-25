import React, { useEffect } from "react";
import { fetchFeaturedProducts } from "../../Actions/productActions";
import { useDispatch } from "react-redux";

const FeaturedProducts = () => {
  const dispatch = useDispatch();

  // get featured products
  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, []);

  return <div>FeaturedProducts</div>;
};

export default FeaturedProducts;
