import { useEffect, useState } from "react"
import axios from "axios";
import Loader from "../components/Loader";
import ProductListingCards from "../components/ProductListingCards";
import Paginate from "../components/Paginate";
import { Container } from "@mui/material";

const AllProductsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState({});
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] =useState(0);

    const ListProduct = async(page)=>{
        setIsLoading(true);
        try{
            const { data } = await axios.get(`/api/product/get?page=${page}`);

            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
            setProducts(data.products)
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(() => {
        ListProduct();
    },[]);

    const handlePageChange = (e, newPage) => {
          setCurrentPage(newPage);
          ListProduct(newPage);
      } 
    
  return (
    <Container>
        {isLoading ?
        (
        <Loader/>
        ) 
        :(products.length > 0 ?  (
            <div className=" ">
            <h1 className="text-5xl font-semibold mx-4">All Products</h1>
            <ProductListingCards products={products} />
            </div>
          ): (
            <p className="text-red-500">No products found.</p>
          )
          )}
    {totalPages > 1  && (
      <Paginate 
      page={currentPage} 
      count={totalPages} 
      onPageChange={handlePageChange}/>
      )
    }
    </Container>
  )
}
export default AllProductsPage