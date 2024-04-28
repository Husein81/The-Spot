import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layouts/App";
import ProductPage from "../layouts/ProductPage";
import CategoryPage from "../layouts/CategoryPage";
import ProductForm from "../components/ProductComponents/ProductForm";
import DashboardPage from "../layouts/DashboardPage";
import HomePage from "../layouts/HomePage";

export const routes: RouteObject[] = [
    {
        path:'/',
        element:<App/>,
        children: [
            {path:'', element:<HomePage/>},
            {path:'dashboard', element:<DashboardPage/>},
            {path:'products', element:<ProductPage/>},
            {path:'categories', element:<CategoryPage/>},
            {path:'createProduct', element:<ProductForm key={'create'}/>},
            {path:'updateProduct/:id', element:<ProductForm key={'update'}/>}
        ]
    }
];

export const router = createBrowserRouter(routes);