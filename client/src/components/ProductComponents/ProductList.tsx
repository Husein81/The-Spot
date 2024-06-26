import React from "react"
import { Product } from "../../apps/models/Product"
import { Box } from "@mui/material"
import ProductCard from "./ProductCard"

interface ProductLisProps {
  products: Product[]
}
const ProductList: React.FC<ProductLisProps> = ({ products }) => {
  return (
    <Box className={"grid-cols-1  sm:grid-cols-3 md:grid-cols-4 grid gap-4"}>
      {products.map((product: Product) => (
        <Box>
          <ProductCard product={product}/>
        </Box>
      ))}
    </Box>
  )
}
export default ProductList;