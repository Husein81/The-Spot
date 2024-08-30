import { Box, Button } from "@mui/material";
import Header from "../../components/Home/Header";
import Loader from "../../components/Others/Loader";
import { useGetProductsQuery } from "../redux/slice/productApi";
import { Product } from "../models/Product";
import ProductList from "../../components/Products/ProductList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery({
    page: 0,
    pageSize: 10,
    searchTerm: "",
  });
  const productsFetch = (): Product[] => {
    const products: Product[] = [];
    for (let i = 0; i < 4; i++) {
      products.push(data?.products[i] as Product);
    }
    return products;
  };

  const navigate = useNavigate();
  const navigateToProduct = () => {
    navigate("/product");
  };

  if (isLoading) return <Loader />;
  return (
    <Box>
      <Header />
      <Box sx={{ pt: 2 }} maxWidth={"lg"} mx={"auto"}>
        <Box>
          <ProductList products={productsFetch()} />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          py={2}
          onClick={navigateToProduct}
        >
          <Button variant="contained">Virew All</Button>
        </Box>
      </Box>
    </Box>
  );
};
export default Home;
