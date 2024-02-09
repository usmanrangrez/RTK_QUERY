import React, { useEffect, useState } from "react";
import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
} from "../app/service/dummyData";
import { useParams } from "react-router-dom";

const UpdateProductForm = () => {
  const { productId } = useParams();

  const { data: product, isLoading: isLoadingSingle } =
    useGetProductByIdQuery(productId);

  const [updateProduct, { isLoading, isSuccess, isError }] =
    useUpdateProductMutation();

  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
  });

  // Update local state when product data is fetched
  useEffect(() => {
    if (product) {
      setProductDetails({
        title: product.title,
        description: product.description,
        // Set other fields as necessary
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setProductDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({ id: productId, ...productDetails });
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (isLoadingSingle) return <div>Loading Single product details...</div>;
  if (isLoading) return <div>Updating product...</div>;
  if (isSuccess) return <div>Product updated successfully!</div>;
  if (isError) return <div>An error occurred while updating the product</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Title:
        <input
          name="title"
          value={productDetails.title}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Product Description:
        <input
          name="description"
          value={productDetails.description}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit" disabled={isLoading}>
        Update Product
      </button>
    </form>
  );
};

export default UpdateProductForm;
