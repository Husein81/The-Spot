import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layouts/App";
import ProductPage from "../../components/ProductComponents/ProductPage";
import CategoryPage from "../../components/CategoryComponents/CategoryPage";
import ProductForm from "../../components/ProductComponents/ProductForm";
import DashboardPage from "../../components/DashboardComponents/DashboardPage";
import HomePage from "../layouts/HomePage";
import LoginForm from "../../components/User/LoginForm";
import RegisterForm from "../../components/User/RegisterForm";
import CategoryForm from "../../components/CategoryComponents/CategoryForm";
import ProfilePage from "../../components/User/ProfilePage";
import OrderPage from "../../components/OrderComponents/OrderPage";

export const routes: RouteObject[] = [
    {
        path:'/',
        element:<App/>,
        children: [
            {path:'', element:<HomePage/>},
            {path:'dashboard', element:<DashboardPage/>},
            {path:'products', element:<ProductPage/>},
            {path:'createProduct', element:<ProductForm key={'create'}/>},
            {path:'updateProduct/:id', element:<ProductForm key={'update'}/>},
            {path:'categories', element:<CategoryPage/>},
            {path:'createCategory', element:<CategoryForm key={'create'}/>},
            {path:'updateCategory/:id', element:<CategoryForm key={'update'}/>},
            {path:'login', element:<LoginForm />},
            {path:'register', element:<RegisterForm/>},
            {path:'profile', element:<ProfilePage/>},
            {path:'orders', element:<OrderPage/>}
        ]
    }
];

export const router = createBrowserRouter(routes);