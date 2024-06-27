import { Box, Container, IconButton, InputBase, Pagination, Typography } from "@mui/material"
import { useGetProductsQuery } from "../../apps/redux/Slice/productApi";
import ProductList from "./ProductList";
import Loader from "../OtherComponents/Loader";
import { useState } from "react";
import { Search } from "@mui/icons-material";

const ProductsPage = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const {data, isLoading} = useGetProductsQuery({
      page,
      searchTerm
    });
    const products = data?.products || [];

  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      event.preventDefault();
      setPage(value);
    }

    if(isLoading) return <Loader/>
  return (
    <Container sx={{py:10}}>
      <Box 
        display={'flex'}
        borderRadius={'3px'}
        bgcolor={'#f0f0f0'}
        width={'100%'}
        my={2}>
          <InputBase
          sx={{ mx:2, flex:1,bgcolor:'#f0f0f0', color:'black'}}
          placeholder="Search"
          name="searchTerm"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          />
          <IconButton sx={{borderRadius:1, p:1}}>
            <Search/>
          </IconButton>
      </Box>
      <Box>
        <Box my={1}>
          <Typography variant="h4" align="left" color={'GrayText'}>Products</Typography>
        </Box>
        <ProductList products={products} />
        <br/>
        <Pagination
          page={page}
          count={data?.totalPages}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          />
      </Box>
    </Container>
  )
}
export default ProductsPage