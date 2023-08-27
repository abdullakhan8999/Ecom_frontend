import React, { useEffect } from "react";
import { fetchFeaturedProducts } from "../../Actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import ProductCard from "../ProductsComponents/ProductCard";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { featuredProducts, featuredProductsLoading } = useSelector(
    (state) => state.featuredProducts
  );

  // get featured products
  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);
  return (
    <>
      {featuredProductsLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default FeaturedProducts;
