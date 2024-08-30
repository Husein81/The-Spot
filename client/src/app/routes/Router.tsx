import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import Home from "../layout/Home";
import Product from "../layout/Product";
import { Search } from "@mui/icons-material";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/Home", element: <Home /> },
      { path: "/product", element: <Product /> },
      { path: "/search", element: <Search /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
