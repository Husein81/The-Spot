import { Container } from "@mui/material"
import { useGetProductsQuery } from "../../apps/redux/Slice/productApi";
import ProductList from "./ProductList";
import Loader from "../OtherComponents/Loader";

const ProductsPage = () => {
    const {data, isLoading} = useGetProductsQuery({});
    const products = data?.products || [];

    if(isLoading) return <Loader/>
  return (
    <Container maxWidth="md">
        <ProductList products={products} />
    </Container>
  )
}
export default ProductsPage