import { Box, Container, Pagination } from "@mui/material"
import Header from "./Header"
import ProductList from "../ProductComponents/ProductList";
import { useGetProductsQuery } from "../../apps/redux/Slice/productApi";
import Loader from "../OtherComponents/Loader";
import { useState } from "react";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const {data, isLoading} = useGetProductsQuery({
    page
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };
  const products = data?.products || [];

  if(isLoading) return <Loader/>
  
  return (
    <Container sx={{py:12}}>
        <Header/>
        <Box>
          <ProductList products={products}/>
          <br/>
          <Pagination 
            count={data?.totalPages} 
            page={page}  
            onChange={handleChange}
            variant={"outlined"} 
            shape={"rounded"}/>
        </Box>
    </Container>
  )
}
export default HomePage;