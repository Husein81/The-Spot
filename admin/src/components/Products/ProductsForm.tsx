/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, FormControl, FormGroup, FormLabel, TextField, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react";
import { useCreateProductMutation, useGetProductQuery, useUpdateProductMutation } from "../../app/redux/slice/productApi";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/slice/modalSlice";
import { Product } from "../../app/model/Product";
import ImageOutput from "../Others/ImageOutput";
import ImageInput from "../Others/ImageInput";
import { ColorSet } from "../../app/theme/Colors";
import { app } from "../../firebase";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';


type Props = {
    colors:ColorSet;
    id?: string;
    refetch: () => any;
}
const ProductsForm: FC<Props> = ({ id,colors, refetch }) => {
    const [images, setImages] = useState<FileList | null>(null);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [formData, setFormData] = useState<Product>({
        title:'',
        description:'',
        cost:0,
        quantity:0,
        price:0,
        imageUrls: [] as string[],
        category:'',
    });

    const {data: product, refetch:refetchById} = useGetProductQuery(id!,{skip: !id});

    useEffect(() => {
        if(product){
            setFormData(product);
        }
    }, [product]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // Image handling
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
        const newImage = images as FileList;
        if(newImage.length > 0 && newImage.length + formData.imageUrls.length < 7){
          setLoadingUpload(true);
          const promises: Promise<string>[] = [];
          for(let i = 0; i < newImage.length; i++ ){
            promises.push(storeImage(newImage.item(i) as File))
          }
          Promise.all(promises)
            .then((urls: any) => 
              setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(urls)
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
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_: any, i:number) => i !== index) 
          })
      }
    
    //
    const dispatch = useDispatch();
    const [createProduct, {isLoading:isLoadingCreate}] = useCreateProductMutation();
    const [updateProduct, {isLoading:isLoadingUpdate}] = useUpdateProductMutation();

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            if(id){
                await updateProduct(formData);
                refetchById();
            }else{
                console.log(formData);
                await createProduct(formData).unwrap();
            }   
        }catch(err){
            console.error(err);
        }finally{
            dispatch(closeModal());
            refetch();
        }
    }
  return (
    <Container component={'form'} autoComplete="off" onSubmit={onSubmitHandler}>
        <FormControl component={'fieldset'} fullWidth>
            <FormLabel component="legend" sx={{py:"4px"}}>
                <Typography variant="h3" >
                    Products
                </Typography>
            </FormLabel>
            <FormGroup>
                <TextField
                    margin='dense'
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={changeHandler}
                    fullWidth
                />
                <TextField
                    margin='dense'
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={changeHandler}
                    fullWidth
                />
                <TextField
                    margin='dense'
                    type="number"
                    inputProps={{min:0}}
                    label="Cost"
                    name="cost"
                    value={formData.cost}
                    onChange={changeHandler}
                    fullWidth
                />
                <TextField
                    margin='dense'
                    label="Quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={changeHandler}
                    fullWidth
                />
                <TextField
                    margin='dense'
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={changeHandler}
                    fullWidth
                />
                <ImageInput
                    setImages={setImages}
                    handleImageSubmit={handleImageSubmit}
                    loadingUpload={loadingUpload}  
                />
                <ImageOutput
                    colors={colors}
                    formData={formData}
                    handleRemoveImage={handleRemoveImage}
                /> 
                <TextField
                    margin='dense'
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={changeHandler}
                    fullWidth
                />
            
                <Button 
                variant="contained" 
                type="submit"
                disabled={isLoadingCreate || isLoadingUpdate}
                >
                    {isLoadingCreate || isLoadingUpdate ? 'Submitting...' : 'Submit'}
                </Button>
            </FormGroup>
   
        </FormControl>

    </Container>
  )
}
export default ProductsForm