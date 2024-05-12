import { 
  Box,
  Button,
  Container, 
  FormControl, 
  FormGroup, 
  FormLabel,  
  IconButton,  
  TextField, 
  Typography,
  useTheme, 
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Product } from "../../models/Product";
import { useNavigate, useParams } from "react-router-dom";
import { 
  useCreateProductMutation, 
  useGetProductQuery, 
  useUpdateProductMutation 
} from "../../redux/slices/productApi";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../../firebase";
import { Upload } from "@mui/icons-material";
import Loader from "../Loader";
import { v4 as uuid} from 'uuid';
import { token } from "../../../Theme";

const ProductForm = () => {
    const { id: productId  } = useParams();

    const theme = useTheme();
    const colors = token(theme.palette.mode);

    const navigate = useNavigate();
    const [images, setImages] = useState<FileList | null>(null);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();
    const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();
    const [product, setProduct] = useState<Product>({
        _id: '',
        title: '',
        description: '',
        price: 0,
        quantity: '',
        imageUrls:[]
    });
    
    const { data: fetchProduct , isLoading } = useGetProductQuery(productId!);
        
    useEffect(() => {
        if(fetchProduct){
          setProduct(fetchProduct);
        }
    },[fetchProduct]);
        
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) => {
        const { name , value } = e.target;
        setProduct({...product, [name]: value});
    }

    const storeImage = (file: File): Promise<string> => {
      return new Promise((resolve, reject) =>{
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadUrl) => resolve(downloadUrl));
          }
        )
      });
    };

    const handleImageSubmit = () => {
      const newImage = images as FileList
      if(newImage.length > 0 && newImage.length + product.imageUrls.length < 7){
        setLoadingUpload(true);
        const promises: Promise<string>[] = [];
        for(let i = 0; i < newImage.length; i++ ){
          promises.push(storeImage(newImage.item(i) as File))
        }
        Promise.all(promises)
          .then((urls) => 
            setProduct({
            ...product,
            imageUrls: product.imageUrls.concat(urls)
          }))
          .then(() => setLoadingUpload(false))
          .catch(() => {
            setLoadingUpload(false);
            console.log("Image upload failed (2 mb max per image)");
          })
      } else {
        setLoadingUpload(false);
        console.log("You can only upload 6 images per listing");
      }
    };
    
    const handleRemoveImage = (url: string, index: number) => {
      const imageName = url.split('/')[7].split('?')[0];
      const storage = getStorage(app); 
      const storageRef = ref(storage, imageName);
      deleteObject(storageRef)
        .catch(() => 
          console.log('Unable to delete the image')
        );
        setProduct({
          ...product,
          imageUrls: product.imageUrls.filter((_, i) => i !== index) 
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!productId){
          product._id = uuid();
          const data = await createProduct(product);
          console.log(data)
          navigate('/products')
        }
        else{
          await updateProduct(product);
          navigate('/products');
        }
    }
    
    if(isLoading) return <Loader color="white" />;

  return (
    <Container component={'form'} onSubmit={handleSubmit} autoComplete="off" sx={{width:880, mb:3,display:'flex',}}>
        <FormControl component={'fieldset'} variant="standard" fullWidth>
            <FormLabel component={'legend'}>
                <Typography variant="h2" color={'text.primary'} >{productId ? 'Edit Product' : 'Create Product'}</Typography>
            </FormLabel>
            <FormGroup>
                <TextField
                label={'Title'}
                variant="filled"
                margin="normal"
                name={"title"}
                value={product.title}
                onChange={handleChange}
                />
                <Box display={'flex'} gap={2} sx={{py:1}}>
                <IconButton component="label" sx={{ display: 'inline-block', border:1, borderRadius:1, borderColor:'#aeaeae' }}>
                  <input 
                  type="file" 
                  accept="image/*" 
                  hidden 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImages(e.target.files)} multiple />
                  <Upload  fontSize="large"/>
                </IconButton>
                <Button variant="contained" color="secondary" onClick={handleImageSubmit}>
                    {loadingUpload ? 'Uploading...' : 'Upload'}
                </Button>
                </Box>
                <Box sx={{my:2, display:'flex', gap:2,}}>
                {product.imageUrls.length > 0 && product.imageUrls.map((url: string, i: number) => (
                <Box
                 key={i}
                 className="flex justify-between p-3 border  items-center rounded-md"
                 width={200}
                >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <Button
                  sx={{'&:hover':{bgcolor:'transparent'}, color:colors.greenAccent[500]}}
                  onClick={() => handleRemoveImage(url, i)} >
                  Delete
                </Button>
              </Box>
            ))}
            </Box>
                <TextField
                margin="normal"
                variant="filled"
                label={'Description'}
                name={'description'}
                value={product.description}
                onChange={handleChange}
                rows={4}
                multiline
                />
                <TextField
                margin="normal"
                variant="filled"
                label={'Price'}
                name={"price"}
                value={product.price}
                onChange={handleChange}
                />
                <TextField
                margin="normal"
                variant="filled"
                label={"quantity"}
                name={"quantity"}
                value={product.quantity}
                onChange={handleChange}
                />
            </FormGroup>
            <Box display={'flex'} justifyContent={'space-between'} py={2} >
                <Button variant="contained" sx={{bgcolor:colors.greenAccent[500], color:'white', "&:hover":{bgcolor:colors.greenAccent[300]}}} type="submit" >{loadingCreate || loadingUpdate ? <Loader color="#fff"  /> : 'Submit'}</Button>
                <Button variant="outlined" sx={{borderColor:colors.greenAccent[500], color:colors.greenAccent[500], "&:hover":{borderColor:colors.greenAccent[300]}}} onClick={() => navigate('/products')}>Cancel</Button>
            </Box>
        </FormControl>
    </Container>
  )
}
export default ProductForm