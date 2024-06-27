import { Box, Button, Container, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../apps/redux/Slice/productApi";
import Loader from "../OtherComponents/Loader";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../apps/redux/Slice/cartSlice";

const ProductPage = () => {
    const { id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productId = id as string;
    const { data: product, isLoading } = useGetProductQuery(productId);
    
    const [image, setImage] = useState<string>(product?.imageUrls[0] ?? '');

    useEffect(() => {
        setImage(product?.imageUrls[0] || '');
    }, [product?.imageUrls])

    //add to cart functionality
    const handleAddToCart = () => {
        if (product && product._id) { // Ensure product and _id are defined
            dispatch(addToCart({...product,quantity: 1,}));
            navigate('/cart')
        } else {
            console.error("Product or product ID is undefined, cannot add to cart.");
        }
    }
    if(isLoading) return <Loader/>
  return (

    <Container sx={{py:12,}}>
        <Box className={"grid grid-cols-1 sm:grid-cols-2"}>
            <Box>
                <Box component="img" height={340} src={image} alt={product?.title} className="cursor-pointer" loading={"lazy"}/>
                <Box py={1} display={'flex'} gap={1}>
                {product?.imageUrls.map((url, index) => (
                    <Box 
                    key={index}
                    className="cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out"
                    component="img" 
                    border={2} 
                    borderColor={'#aeaeae'} 
                    height={80} 
                    loading={"lazy"}
                    onClick={() => setImage(url)}
                    src={url} alt={product.title} />
                ))}
                </Box>
            </Box>
            <Box>
                <Typography variant="h3">{product?.title}</Typography>
                <Typography variant="h6" py={1} color="gray">${product?.price.toFixed(2)}</Typography>
                <Typography variant="body1" py={1} className="p-1 justify-start">{product?.description}</Typography>
                <Typography variant="subtitle1"color={'text.secondary'} py={1}>Quantity: 
                    <Typography variant={"subtitle2"} color={'text.secondary'}>{product?.quantity}</Typography>
                </Typography>
                <Box py={1}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleAddToCart}>
                            Add to Cart
                    </Button>
                </Box>
            </Box>
        </Box>
    </Container>
  )
}
export default ProductPage