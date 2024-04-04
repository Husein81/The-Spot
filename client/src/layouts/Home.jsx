import axios from "axios";
import { useEffect, useState } from "react";
import ProductListingCards from "../components/ProductListingCards";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";
import Featured from "../components/Featured";
import { Box, Container } from "@mui/material";

const Home = () => {
  const [products, setProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async (page) =>{
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
    getProducts(currentPage);
  },[]);

  const handlePageChange = (e, newPage) => {
    setCurrentPage(newPage);
    getProducts(newPage);    
  } 
  return (
  <Box
  >
    <Featured/>
    <Container
    sx={{maxWidth:1080}}
    >
      {isLoading ? (
        <Loader/>
        ) : products.length > 0 ?  (
          <ProductListingCards products={products} />
          ) : (
            <p className="text-red-500">No products found.</p>
            )
          }
    {totalPages > 1  && (
      <Paginate 
      count={totalPages} 
      page={currentPage} 
      onPageChange={handlePageChange}/>
      )
    }
    </Container>

  </Box>
  )
}
export default Home