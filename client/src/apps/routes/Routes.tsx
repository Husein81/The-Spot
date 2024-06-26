import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../layout/App';
import HomePage from '../../components/Home/HomePage';

export const routes: RouteObject[] = [
    {
        path:'/',
        element:<App/>,
        children: [
            {path:'/', element:<HomePage/>}
        ]
    }
]

export const router = createBrowserRouter(routes);