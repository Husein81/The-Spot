import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../layout/App';
import HomePage from '../../components/Home/HomePage';
import ProductsPage from '../../components/ProductComponents/ProductsPage';
import ProductPage from '../../components/ProductComponents/ProductPage';
import CartPage from '../../components/CartComponents/CartPage';

export const routes: RouteObject[] = [
    {
        path:'/',
        element:<App/>,
        children: [
            {path:'/', element:<HomePage/>},
            {path:'products', element:<ProductsPage/>},
            {path:'product/:id', element:<ProductPage/>},
            {path:'cart', element:<CartPage/>}
        ]
    }
]

export const router = createBrowserRouter(routes);