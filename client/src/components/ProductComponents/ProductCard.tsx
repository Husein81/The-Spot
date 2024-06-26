import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Product } from "../../apps/models/Product"

interface ProductCardProps {
    product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  return (
    <Card sx={{height:'100%'}}>
        <CardMedia
            component="img"
            height="140"
            className="hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
            image={product.imageUrls[0]}
        />
        <CardContent>
            <Typography variant="h5">{product.title}</Typography>
            <Typography variant="body2">{product.price}</Typography>            
        </CardContent>
    </Card>
  )
}
export default ProductCard;