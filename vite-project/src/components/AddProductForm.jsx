import React, { useState } from "react";
import { useAddProductMutation } from "../app/service/dummyData";

const AddProductForm = () => {
  const [addProduct, { data, isLoading, isSuccess, isError }] =
    useAddProductMutation();

  const [productDetails, setProductDetails] = useState({
    title: "", // Initialize other fields similarly
    description: "",
  });

  const handleChange = (e) => {
    setProductDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await addProduct(productDetails);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>Adding product...</div>;
  if (isSuccess) return <div>Product added successfully!</div>;
  if (isError) return <div>An error occurred</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Title:
        <input
          name="title"
          value={productDetails?.title}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Product Description:
        <input
          name="description"
          value={productDetails?.description}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit" disabled={isLoading}>
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
