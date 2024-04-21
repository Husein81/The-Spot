import { Grid } from "@mui/material"
import { Product } from "../../models/Product"
import ProductCard from "./ProductCard"

interface Props{
    products: Product[]
}
const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={2}>
            {products.map(product => (
                <Grid item xs={12} sm={4}   key={product._id}>
                    <ProductCard product={product}/>
                </Grid>
            ))}
    </Grid>
  )
}
export default ProductList