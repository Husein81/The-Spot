import { 
    Box,
    Button,
    Container, 
    FormControl, 
    FormGroup, 
    FormLabel,  
    IconButton, 
    InputAdornment, 
    TextField, 
    Typography 
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Product } from "../../models/Product";
import { useNavigate, useParams } from "react-router-dom";
import {v4 as uuid} from 'uuid';
import agent from "../../api/agen";
import { UploadFileOutlined } from "@mui/icons-material";

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false); 
    const [product, setProduct] = useState<Product>({
        _id: '',
        title: '',
        description:'',
        price: '',
        quantity: '',
    });
    
    const fetchProduct = async (id: string) => {
       setIsLoading(true);
       try {
          const response = await agent.Products.fetchById(id);
          setProduct(response); 
        } catch (err) {
        console.error("Error fetching products:", err);
        } finally { 
          setIsLoading(false);
        }
    };
    useEffect(() => {
        if(id){
            fetchProduct(id);
        }
    },[id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) => {
        const { name , value } = e.target;
        setProduct({...product, [name]: value});
    }
    const createProduct = async(product: Product) => {
        product._id = uuid();
        await agent.Products.create(product);
    }
    const updateProduct = async (product: Product) => {
        await agent.Products.update(product);
    }
    const handleSubmit = () => {
        if(!product._id){
            createProduct(product);
            navigate('/products');
        }
        else{
            updateProduct(product);
            navigate('/products');

        }
    }
    
    
  return (
    <Container component={'form'} onSubmit={handleSubmit} autoComplete="off" sx={{display:'flex', boxShadow:2, borderRadius:1}}>
        <FormControl component={'fieldset'} variant="standard" fullWidth>
            <FormLabel component={'legend'}>
                <Typography variant="h4" color={'text.primary'} >{id ? 'Edit Product' : 'Create Product'}</Typography>
            </FormLabel>
            <FormGroup>
                <TextField
                label={'Title'}
                margin="normal"
                name={"title"}
                value={product.title}
                onChange={handleChange}
                />
                <Box>
                <TextField
                    variant="standard"
                    type="file"
                    InputProps={{
                        disabled: true,
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton >
                                <UploadFileOutlined />
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    />
                    <Button variant="contained" component="span" >
                        Upload
                        </Button>
                </Box>
                <TextField
                margin="normal"
                label={'Description'}
                name={'description'}
                value={product.description}
                onChange={handleChange}
                rows={4}
                multiline
                />
                <TextField
                margin="normal"
                label={'Price'}
                name={"price"}
                value={product.price}
                onChange={handleChange}
                />
                <TextField
                margin="normal"
                label={"quantity"}
                name={"quantity"}
                value={product.quantity}
                onChange={handleChange}
                />
            </FormGroup>
            <Box display={'flex'} justifyContent={'space-between'} py={2} >
                <Button variant="contained" type="submit" >{isLoading ? 'Submitting...' : 'Submit'}</Button>
                <Button variant="outlined" onClick={() => navigate('/products')}>Cancel</Button>
            </Box>
        </FormControl>
    </Container>
  )
}
export default ProductForm