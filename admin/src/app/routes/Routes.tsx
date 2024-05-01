import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layouts/App";
import ProductPage from "../components/Product/ProductPage";
import CategoryPage from "../components/CategoryComponents/CategoryPage";
import ProductForm from "../components/Product/ProductForm";
import DashboardPage from "../components/DashboardComponents/DashboardPage";
import HomePage from "../layouts/HomePage";
import LoginForm from "../components/User/LoginForm";
import RegisterForm from "../components/User/RegisterForm";

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
            {path:'updateProduct/:id', element:<ProductForm key={'update'}/>},
            {path:'login', element:<LoginForm />},
            {path:'register', element:<RegisterForm/>}
        ]
    }
];

export const router = createBrowserRouter(routes);