/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Category } from "../../app/model/Category";
import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../app/redux/slice/categoryApi";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/slice/modalSlice";
import ImageInput from "../Others/ImageInput";
import {
  handleImageSubmit,
  handleRemoveImage,
} from "../../app/utils/generateImage";
import ImageOutput from "../Others/ImageOutput";
import { token } from "../../app/theme/Colors";
type Props = {
  id?: string;
  refetch: () => any;
};
const CategoryForm: FC<Props> = ({ id, refetch }) => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [images, setImages] = useState<FileList | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Category>({
    name: "",
    imageUrls: [],
  });

  const { data: categoryData, refetch: refetchById } = useGetCategoryQuery(
    id!,
    { skip: !id }
  );
  const [createCategory, { isLoading: isLoadingCreate }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isLoadingUpdate }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (categoryData) {
      setFormData(categoryData);
    }
  }, [categoryData]);
  const submitImageHandle = () => {
    handleImageSubmit(images!, formData, setLoadingUpload, setFormData);
  };
  const removeImageHandler = (url: string, index: number) => {
    handleRemoveImage(url, index, formData, setFormData);
  };
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        console.log(formData);
        await updateCategory(formData).unwrap();
        refetchById();
      } else {
        await createCategory(formData).unwrap();
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(closeModal());
      refetch();
    }
  };
  return (
    <Container component={"form"} onSubmit={onSubmitHandler}>
      <FormControl component={"fieldset"} fullWidth>
        <FormLabel component={"legend"}>
          <Typography variant={"h4"}>Category Form</Typography>
        </FormLabel>
        <TextField
          variant={"outlined"}
          label={"Category Name"}
          name={"name"}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <ImageInput
          setImages={setImages}
          loadingUpload={loadingUpload}
          handleImageSubmit={submitImageHandle}
        />
        <ImageOutput
          colors={colors}
          formData={formData}
          handleRemoveImage={removeImageHandler}
        />
        <Button
          variant={"contained"}
          type="submit"
          disabled={isLoadingCreate || isLoadingUpdate}
        >
          {isLoadingCreate || isLoadingUpdate ? "Loading..." : "Submit"}
        </Button>
      </FormControl>
    </Container>
  );
};
export default CategoryForm;
