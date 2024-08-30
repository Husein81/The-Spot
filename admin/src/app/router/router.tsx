import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import Dashboard from "../layout/Dashboard";
import Product from "../layout/Product";
import Category from "../layout/Category";
import Order from "../layout/Order";

const routes: RouteObject[] = [
   {
    path:'',
    element: <App/>,
    children: [
        {path: 'dashboard', element: <Dashboard/>},    
        {path: 'products', element: <Product/>},
        {path:'categories', element: <Category/>},
        {path:'orders', element: <Order/>}
    ]
}]

export const router = createBrowserRouter(routes);
