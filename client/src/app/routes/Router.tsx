import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import Home from "../layout/Home";
import Products from "../layout/Products";
import { Search } from "@mui/icons-material";
import Product from "../../components/Products/Product";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/search", element: <Search /> },
      { path: "/products/:id", element: <Product /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
