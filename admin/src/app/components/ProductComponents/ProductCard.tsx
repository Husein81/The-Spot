import React from "react"
import { Product } from "../../models/Product"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"

interface Props {
    product: Product
}
const ProductCard:React.FC<Props> = ({ product }) => {
  return (
    <Card sx={{height:{xs:'100%'}, width:'100%'}}>
        <CardMedia
        component={"img"}
        image={product.imageUrls?.[0]}
        alt={product.title}
        />
        <CardContent>
            <Typography variant="body1">{product.title}</Typography>
            <Typography color={'text.secondary'} variant="body2">{product.price}.00 $</Typography>
        </CardContent>
    </Card>
  )
}
export default ProductCard