import { 
  Box,
  Button, 
  Container, 
  Grid, 
  IconButton,  
  InputBase, 
  Typography, 
  useTheme
} from "@mui/material";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/slices/productApi";
import ProductTable from "./productTable";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { token } from "../../../Theme";



const ProductPage = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading }  = useGetProductsQuery({
    isAdmin: true,
    searchTerm,
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const products = data?.products || [];

  return (
    <Container >
      {isLoading ? (
       <Loader/>
        ) : 
         (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box 
                display={'flex'}
                bgcolor={colors.primary[400]}
                borderRadius={'3px'}
                width={'fit-content'}
                my={1}>
                  <InputBase
                  sx={{bgcolor:colors.primary[400], color:'white',mx:2, flex:1}}
                  placeholder="Search"
                  name="searchTerm"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  />
                  <IconButton sx={{borderRadius:1, p:1, color:colors.greenAccent[500]}}>
                    <Search/>
                  </IconButton>
              </Box>
              <Typography variant="h2"  py={2} sx={{textTransform:'uppercase'}}>Products</Typography>
              <Button
              variant="contained"
              sx={{bgcolor:colors.greenAccent[400], '&:hover':{bgcolor:colors.greenAccent[700]}}}
              onClick={() => navigate("/createProduct")}
              >
                Create Product
              </Button>
            </Grid>
            <Grid item xs={12} >
                <ProductTable products={products} />
            </Grid>
          </Grid>
      )}
    </Container>
  );
};

export default ProductPage;
