import React from "react"
import { Product } from "../../apps/models/Product"
import { Box, Typography } from "@mui/material"
import ProductCard from "./ProductCard"

interface ProductLisProps {
  products: Product[]
}
const ProductList: React.FC<ProductLisProps> = ({ products }) => {
  return (
    <Box className={"grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid gap-4"}>
      {products.map((product: Product) => (
        <Box>
          <ProductCard product={product}/>
        </Box>
      ))}
    {products.length ==0 && <Typography color={'gray'} variant="h6" sx={{p:2,textAlign:'center'}}>Item Not Found</Typography>}
    </Box>
  )
}
export default ProductList;