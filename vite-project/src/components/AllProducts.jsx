import React from "react";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../app/service/dummyData";
import { Link, NavLink } from "react-router-dom";

const AllProducts = () => {
  // const res = useGetAllProductsQuery();
  //do console and you'll understand

  const { data, isError, isLoading } = useGetAllProductsQuery();
  const [
    deleteProduct,
    { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess },
  ] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    await deleteProduct(id);
    // Optionally, handle the success case, such as showing a notification
  };

  if (isError) {
    return <h1>You got into some Error</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>All Products</h1>
      {data?.products.map((prod) => {
        return (
          <div key={prod?.id}>
            <h3>
              <NavLink to={`/products/${prod?.id}`}>{prod?.title}</NavLink>
            </h3>
            <p>{prod?.description}</p>
            <Link to={`/update-product/${prod?.id}`}>Update</Link>
            <button
              onClick={() => handleDelete(prod?.id)}
              disabled={isDeleteLoading}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default AllProducts;
