import { Link } from "react-router-dom";
import Layout from "../../components/AdminComponents/Layout";
import axios from "axios";
import { FaEdit, FaTrash} from 'react-icons/fa' 
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import Paginate from "../../components/Paginate";
const ProductsList = () => {  
  
  const {currentUser} = useAuth();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  console.log(currentUser.rest.isAdmin)
  const getProducts = async (page) => {
    try{
      const { data } = await axios.get(`/api/product/get?page=${page}&&isAdmin=${currentUser.rest.isAdmin}`);
      
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setProducts(data.products)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts();
  },[]);

  const handlePageChange = (newPage) => {
    if(newPage > 0 && newPage <= totalPages){
      setCurrentPage(newPage);
      getProducts(newPage);
    }
  } 
  const handleDelete = async (productId) => {
    try{
      await axios.delete(`/api/product/${productId} `);
      setProducts(products.filter(product => product._id !== productId));
    }catch(error){
      console.log(error);
    }
  }
  
  return (
    <Layout>
        <div className="flex flex-col">
            <Link 
            to={'/admin/products/new'}
            className="bg-gray-300 text-slate-100  max-w-sm rounded-lg  py-1 px-2 text-center mt-5"
            >
              Add new products
            </Link>
            <table className="mt-5 w-[70%] border shadow">
              <thead>
                <tr className="border">
                <td className="uppercase text-sm px-3">NAME</td>
                <td className="text-sm px-3">PRICE</td>
                <td className=""></td>
                <td className=""></td>
                </tr>
              </thead>
              <tbody>
                  {products.length >0 &&
                  products.map((product) => (
                    <tr key={product._id} className="border" >
                      <td className="bg-white text-slate-900  p-3">{product.title}</td>
                      <td className="bg-white text-slate-900 p-3">${product.price}</td>
                      <td className="bg-white text-slate-900 text-center w-4">
                        <Link  
                        to={`/admin/products/update/${product._id}`}
                        value='edit'
                        className=" flex items-center font-semibold gap-2 px-3 py-2 rounded-md border bg-primary text-slate-100  capitalize" >
                          <FaEdit/> 
                          edit
                        </Link>
                      </td>
                      <td className="bg-white w-4 text-slate-900 px-2 py-1">
                        <button 
                        onClick={()=>handleDelete(product._id)}
                         value={'delete'}
                         className="flex items-center gap-2 font-semibold text-slate-100 bg-primary rounded-md py-2 px-3 capitalize "
                        >
                        <FaTrash/> 
                        delete
                        </button>
                        </td>
                    </tr>
                  )) }
              </tbody>
            </table>
        </div>
        {totalPages > 1  && (
      <Paginate 
      page={currentPage} 
      pages={totalPages} 
      onPageChange={handlePageChange}/>
      )
    }
    </Layout>
  );
}
export default ProductsList;