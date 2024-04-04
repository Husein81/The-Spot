/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from '../context/authProvider'
import Loader from "../components/Loader";
import axios from "axios";
import AddShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { 
    Box, 
    Button, 
    CardActions, 
    Container, 
    Typography 
} from "@mui/material";
import { useCart } from "../context/CartContext";

const ProductPage = () => {

    const { id } = useParams();
    const { currentUser} = useAuth();
    const { 
        addItemToCart
    } = useCart();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [image, setImage] = useState("");    

    const isLoggedOut = !currentUser ? true : false;
    const ListProduct = async()=>{
        setIsLoading(true);
        try{
            const { data } = await axios.get(`/api/product/${id}`);
            setProduct(data);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(() => {
        ListProduct();
    },[]);
    
    const handleAddToCart = (product) => {
        try {
          addItemToCart(product);
          console.log(product)
          navigate(`/cart`)
        } catch (err) {
          console.error('Error adding to cart:', err);
        }
      };
 
  return (
    <Container
    sx={{
        my:5
    }}
    >
       <Link 
        to={'/'}
        className="p-2 my-3 rounded-md bg-blue-500 text-slate-100 capitalize"
        >
          go back
        </Link>
       {isLoading 
       ?
       (<Loader/>) 
       :
       (
        <Box
         className="py-4 flex flex-col">
            <Typography variant="h3"className="text-5xl">{product.title}</Typography>
            <Box 
            sx={{
                maxWidth:'100%',
                justifyContent:'center',
                gap:8,
                p:2,
                bgcolor:'#eee',
                borderRadius:2,
                display:{xs:'block', sm:'flex' },
                mx:'auto'

            }}
            >
                <Box className=" rounded p-4 gap-4">
                    <img  className="max-w-[256px] h-[256px] rounded cursor-pointer" src={image || product.imageUrls?.[0]}/>
                    <Box className="flex gap-1 flex-grow py-2">
                    {product.imageUrls &&
                    product.imageUrls.map((image,index) =>(  
                        <Box key={index} className="border p-1  rounded cursor-pointer">
                            <img className="h-14 rounded" src={image} onClick={()=> setImage(image)} />
                        </Box>  
                    ))
                    }
                    </Box>
                </Box>
                <Box
                display={'flex'}
                flexDirection={'column'}
                gap={1}
                mt={2}
                textAlign={'justify'}
                >
                <Box className="max-w-64">
                    <Typography variant="body2">
                    {product.description}
                    </Typography>
                </Box>
                <Box className="">
                 <Typography variant="h6">
                    Price: <Typography variant="body2">${product.price}</Typography>
                 </Typography> 
                </Box>
                <Box>
                    <Typography variant="h6">
                    Quantity In Stock: <Typography variant="body2">{product.quantity}</Typography>
                    </Typography>
                </Box>
                <Box className="flex gap-2">
                       <Typography variant="h6">
                            Status: 
                        </Typography> 
                       <Button 
                       variant={'outlined'}
                       color={`${product.quantity > 0 ?  'success'  : 'error' }`}>
                            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                        </Button>
                </Box>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
     
          <Button 
          variant="contained"
          size="medium" 
          disabled={isLoggedOut}
          startIcon={<AddShoppingCartIcon />} 
          onClick={() => handleAddToCart(product)}>
           {currentUser ?  'Add to Cart' : 'You need to login' }
          </Button>

      </CardActions>
                </Box>
            </Box>
        </Box>
       )
       }
    </Container>
  )
}
export default ProductPage