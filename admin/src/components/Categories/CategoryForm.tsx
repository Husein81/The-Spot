import { Category } from "../../app/models/Category";
import { FC, useState } from "react";
import ImageInput from "../ImageInput";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import ImageOutput from "../ImageOut";
import {
  createCategory,
  useGetCategory,
  updateCategory,
} from "../../app/api/categories";
import { closeModal } from "../../app/redux/slice/modalSlice";
import { useDispatch } from "react-redux";
import { useForm } from "@tanstack/react-form";
import { FieldInfo } from "@/components/FieldInfo";
import Loader from "../theSpotComponents/Loader";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  id?: string;
}
const CategoryForm: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [images, setImages] = useState<FileList | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const { data: category } = useGetCategory(id!);

  const createCategoryMutation = useMutation({
    mutationFn: async (category: Category) => await createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async (category: Category) => await updateCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const form = useForm({
    defaultValues: {
      name: category?.name || "",
      imageUrls: category?.imageUrls || [],
    },
    onSubmit: async ({ value }: { value: Category }) => {
      try {
        if (id) {
          updateCategoryMutation.mutate({ ...value, _id: id });
        } else createCategoryMutation.mutate(value);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(closeModal());
      }
    },
  });

  const storeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            resolve(downloadUrl)
          );
        }
      );
    });
  };

  const handleImageSubmit = () => {
    const newImage = images as FileList;
    if (
      newImage.length > 0 &&
      newImage.length + (category?.imageUrls?.length || 0) < 7
    ) {
      setLoadingUpload(true);
      const promises: Promise<string>[] = [];
      for (let i = 0; i < newImage.length; i++) {
        promises.push(storeImage(newImage.item(i) as File));
      }
      Promise.all(promises)
        .then((urls) =>
          form.setFieldValue("imageUrls", [
            ...(category?.imageUrls || []),
            ...urls,
          ])
        )
        .then(() => setLoadingUpload(false))
        .catch(() => {
          setLoadingUpload(false);
          console.log("Image upload failed (2 mb max per image)");
        });
    } else {
      setLoadingUpload(false);
      console.log("You can only upload 6 images per listing");
    }
  };

  const handleRemoveImage = async (url: string, index: number) => {
    // Extract the image name from the URL
    const imageName = url.split("/")[7]?.split("?")[0];
    if (!imageName) throw new Error("Invalid image URL format");

    // Initialize Firebase Storage
    const storage = getStorage(app);
    const storageRef = ref(storage, imageName);

    // Delete the image from Firebase Storage
    await deleteObject(storageRef);

    // Update the imageUrls in the state by removing the deleted image
    const updatedImageUrls = category?.imageUrls.filter((_, i) => i !== index);
    form.setFieldValue("imageUrls", updatedImageUrls || []);

    console.log("Image deleted successfully");
  };

  return (
    <div className="p-6 w-[26rem]">
      <h2 className="text-xl font-semibold text-center mb-4">
        {id ? "Edit Product" : "Add Product"}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4 flex flex-col"
      >
        {/* Title */}
        <div>
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Title is required"
                  : value.length < 3
                    ? "Title must be at least 3 characters"
                    : null,
            }}
            children={(field) => (
              <>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium"
                >
                  Name
                </label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  id="title"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        {/* Images */}
        <ImageInput
          setImages={setImages}
          handleImageSubmit={handleImageSubmit}
          loadingUpload={loadingUpload}
        />
        <ImageOutput
          formData={form.getFieldValue("imageUrls")}
          handleRemoveImage={handleRemoveImage}
        />
        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              className=" text-white p-2 rounded-md hover:bg-gray-100 hover:text-gray-600"
            >
              {isSubmitting ? <Loader size="sm" /> : "Submit"}
            </Button>
          )}
        />
      </form>
    </div>
  );
};
export default CategoryForm;
