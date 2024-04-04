import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useAuth } from "../context/authProvider";
/* eslint-disable react/prop-types */
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { _id, title, imageUrls, price} = product;

  const isLoggedOut = !currentUser ? true : false;
  return (
    <Card 
    className="transition-shadow"
    sx={{
      border:1,
      width:{xs:'100%', sm:'245px'},
      borderRadius:2,
      borderColor:"#eee",
      
    }}
    >
      <Link to={`/product/${_id}`}>
      <CardMedia
        component="img"
        sx={{
          height:{xs:'330px', sm:'260px'},
          objectFit:'cover',
          width:'100%'
        }}
        className=" hover:scale-105 transition-scale duration-300"
        image={imageUrls[0]}
        alt={title}
      />
      </Link>
      <CardContent >
        <Link to={`/product/${_id}`}>
        <Typography variant={'body1'} component={'h1'}>{title}</Typography>
        </Link>
        <Typography variant={"body2"} color={'text.secondary'}>${price.toFixed(2)}</Typography>
          </CardContent>

        <CardActions sx={{justifyItems:'flex-end'}}>
          <Button 
          disabled={isLoggedOut}
          fullWidth 
          variant="contained" 
          size="small" 
          startIcon={<AddShoppingCartIcon />} 
          onClick={() => navigate(`/product/${product._id}`)}>
            {isLoggedOut? 'Sign in First' : 'Add to Cart'}
          </Button>
        </CardActions>
    </Card>
  )
}
export default ProductCard