import { Button, Container, Grid} from "@mui/material";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../redux/slices/productApi";
import ProductList from "../components/ProductComponents/ProductList";


const ProductPage = () => {
  const navigate = useNavigate();
  const { data, isLoading }  = useGetProductsQuery({
    isAdmin: true
   });
   
  return (
    <Container >
      {isLoading ? (
       <Loader/>
        ) : 
         (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
              sx={{}}
              variant="contained"
              onClick={() => navigate("/createProduct")}
              >
                Create Product
              </Button>
            </Grid>
            <Grid item xs={12} >
              <ProductList products={data.products}/>
            </Grid>
          </Grid>
      )}
    </Container>
  );
};

export default ProductPage;
