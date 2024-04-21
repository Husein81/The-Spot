import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layouts/App";
import HomePage from "../layouts/HomePage";
import ProductPage from "../layouts/ProductPage";
import CategoryPage from "../layouts/CategoryPage";
import ProductForm from "../components/ProductComponents/ProductForm";

export const routes: RouteObject[] = [
    {
        path:'/',
        element:<App/>,
        children: [
            {path:'', element:<HomePage/>},
            {path:'products', element:<ProductPage/>},
            {path:'categories', element:<CategoryPage/>},
            {path:'createProduct', element:<ProductForm key={'create'}/>},
            {path:'updateProduct/:id', element:<ProductForm key={'update'}/>}
        ]
    }
];

export const router = createBrowserRouter(routes);