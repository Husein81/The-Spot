import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Product } from "../../apps/models/Product"
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const navigate = useNavigate();
  return (
    <Card sx={{height:'100%'}}>
        <CardMedia
          component="img"
          className="hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
          image={product.imageUrls[0]}
          onClick={() => navigate(`/product/${product._id}`)}
        />
        <CardContent>
          <Typography variant="h5">{product.title}</Typography>
          <Typography variant="subtitle1" color={"text.secondary"}>${product.price.toFixed(2)}</Typography>            
        </CardContent>
    </Card>
  )
}
export default ProductCard;