import { Box, Button, Container, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../apps/redux/Slice/productApi";
import Loader from "../OtherComponents/Loader";
import { useEffect, useState } from "react";

const ProductPage = () => {
    const { id} = useParams<{id: string}>();
    const productId = id as string;
    const { data: product, isLoading } = useGetProductQuery(productId);
    
    const [image, setImage] = useState<string>(product?.imageUrls[0] || '');
    useEffect(() => {
        setImage(product?.imageUrls[0] || '');
    }, [product?.imageUrls])

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
                <Box py={1}>
                    <Button variant="contained" color="secondary">Add to Cart</Button>
                </Box>
            </Box>
        </Box>
    </Container>
  )
}
export default ProductPage