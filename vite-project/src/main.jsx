import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllProducts from "./components/AllProducts.jsx";
import ErrorComponent from "./components/ErrorComponent.jsx";
import SpecificProduct from "./components/SpecificProduct.jsx";
import AddProductForm from "./components/AddProductForm.jsx";
import UpdateProductForm from "./components/UpdateProductForm.jsx";

//with the setup you've provided in main.jsx or index.js, where you define your routing and wrap your application with the Redux Provider at the top level, you technically don't need an App.js

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AllProducts />,
    },
    {
      path: "products/:productId",
      element: <SpecificProduct />,
    },
    {
      path: "add-product",
      element: <AddProductForm />,
    },
    {
      path: "update-product/:productId",
      element: <UpdateProductForm />,
    },
  ],
  //The errorElement property should not be inside the routes array. Instead, it's provided as part of the second argument to createBrowserRouter, which accepts an options object. This object can include the errorElement that will be rendered when no other routes match (acting as a catch-all error or 404 page).,
  {
    errorElement: <ErrorComponent />,
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
