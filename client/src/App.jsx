/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "./context/authProvider";
import Home from "./layouts/Home";
import SignInPage from "./layouts/SignInPage";
import SignUpPage from "./layouts/SignUpPage";
import AdminRoute from './components/AdminRoute';
import AdminHome from "./layouts/admin/AdminHome";
import ProductsList from "./layouts/admin/ProductsList";
import Footer from "./components/Footer";
import NewProduct from "./components/AdminComponents/NewProduct";
import ProductPage from "./layouts/ProductPage";
import AllProductsPage from "./layouts/AllProductsPage";
import UpdateProduct from "./components/AdminComponents/UpdateProduct";
import Categories from "./layouts/admin/Categories";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Search from "./layouts/Search";
import CartPage from "./layouts/CartPage";
import CheckOutPage from "./layouts/CheckOutPage";


function App() {

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(currentUser && currentUser.rest.isAdmin)
      navigate('/admin')
  },[]);

  
  return (

    <div className="min-h-full">

     { currentUser && !currentUser.rest.isAdmin && <Navbar title={'The Spot'}/>} 
     {!currentUser && <Navbar title={'The Spot'}/>}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path={'/product/:id'} element={<ProductPage/>}/>
        <Route path="/products" element={<AllProductsPage/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<CheckOutPage/>}/>
        {currentUser && (
          <>
            <Route path="/sign-in" element={<Navigate to="/" replace />} />
            <Route path="/sign-up" element={<Navigate to="/" replace />} />
          </>
        )}
        {!currentUser && (
          <>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </>
        )}
        <Route path={'/admin'} element={<AdminRoute/>} >
          <Route index={true} path={'/admin'} element={<AdminHome/>}/>
          <Route path={"/admin/products"} element={<ProductsList/>}/>
          <Route path={"/admin/products/new"} element={<NewProduct/>}/>
          <Route path={"/admin/products/update/:id"} element={<UpdateProduct/>}/>
          <Route path={'/admin/categories'} element={<Categories/>}/>
        </Route>
      </Routes>
      {<Footer/>}

    </div>
  )
}

export default App
