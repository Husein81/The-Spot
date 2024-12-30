import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layouts/App";
import Dashboard from "../layouts/Dashboard";
import Products from "../layouts/Products";
import Categories from "../layouts/Categories";
import Orders from "../layouts/Orders";

const routes: RouteObject[] = [
  {
    path: "",
    element: <App />,
    children: [
      { path: "Home", element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "orders", element: <Orders /> },
      { path: "categories", element: <Categories /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
