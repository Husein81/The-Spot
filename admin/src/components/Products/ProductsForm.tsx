/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../app/redux/slice/productApi";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/slice/modalSlice";
import { Product } from "../../app/model/Product";
import ImageOutput from "../Others/ImageOutput";
import ImageInput from "../Others/ImageInput";
import { ColorSet } from "../../app/theme/Colors";
// import { app } from "../../firebase";
// import {
//   deleteObject,
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
import {
  handleImageSubmit,
  handleRemoveImage,
} from "../../app/utils/generateImage";
import { useGetCategoriesQuery } from "../../app/redux/slice/categoryApi";
type Props = {
  colors: ColorSet;
  id?: string;
  refetch: () => any;
};
const ProductsForm: FC<Props> = ({ id, colors, refetch }) => {
  const [images, setImages] = useState<FileList | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [formData, setFormData] = useState<Product>({
    title: "",
    description: "",
    cost: 0,
    quantity: 0,
    price: 0,
    imageUrls: [] as string[],
    category: "",
  });

  const { data: product, refetch: refetchById } = useGetProductQuery(id!, {
    skip: !id,
  });
  const { data } = useGetCategoriesQuery({
    page: 1,
    pageSize: 1000,
    searchTerm: "",
  });
  const categories = data?.categories || [];

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const imageSubmitHandler = () => {
    handleImageSubmit(images!, formData, setLoadingUpload, setFormData);
  };
  const removeImageHandler = (url: string, index: number) => {
    handleRemoveImage(url, index, formData, setFormData);
  };
  const dispatch = useDispatch();
  const [createProduct, { isLoading: isLoadingCreate }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateProductMutation();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(formData);
        refetchById();
      } else {
        await createProduct(formData).unwrap();
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(closeModal());
      refetch();
    }
  };
  return (
    <Container component={"form"} autoComplete="off" onSubmit={onSubmitHandler}>
      <FormControl component={"fieldset"} fullWidth>
        <FormLabel component="legend" sx={{ py: "4px" }}>
          <Typography variant="h3">Products</Typography>
        </FormLabel>
        <FormGroup>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={formData.title}
            onChange={changeHandler}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={formData.description}
            onChange={changeHandler}
            fullWidth
          />
          <TextField
            margin="dense"
            type="number"
            inputProps={{ min: 0 }}
            label="Cost"
            name="cost"
            value={formData.cost}
            onChange={changeHandler}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={changeHandler}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            value={formData.price}
            onChange={changeHandler}
            fullWidth
          />
          <ImageInput
            setImages={setImages}
            handleImageSubmit={imageSubmitHandler}
            loadingUpload={loadingUpload}
          />
          <ImageOutput
            colors={colors}
            formData={formData}
            handleRemoveImage={removeImageHandler}
          />
          <Autocomplete
            options={categories}
            getOptionLabel={(option) => option.name}
            value={categories.find((cat) => cat._id === formData.category)}
            onChange={(e, value) => {
              setFormData({
                ...formData,
                category: value?._id || "",
              });
            }}
            renderInput={(params) => (
              <TextField {...params} margin="dense" label="Category" />
            )}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || isLoadingUpdate ? "Submitting..." : "Submit"}
          </Button>
        </FormGroup>
      </FormControl>
    </Container>
  );
};
export default ProductsForm;
