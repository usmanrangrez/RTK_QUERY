import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../app/service/dummyData";

const SpecificProduct = () => {
  const { productId } = useParams();
  const {
    data: product,
    isError,
    isLoading,
  } = useGetProductByIdQuery(productId);
  // console.log(data);
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error loading the product.</h1>;
  return (
    <div>
      <h1>{product?.title}</h1>
      <p>{product?.description}</p>
    </div>
  );
};

export default SpecificProduct;
