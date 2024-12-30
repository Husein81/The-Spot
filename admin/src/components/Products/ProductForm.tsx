import { FC, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/slice/modalSlice";
import { useGetCategories } from "../../app/api/categories";
import {
  createProduct,
  updateProduct,
  useGetProduct,
} from "../../app/api/products";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Pagination } from "../../app/models/Pagination/pagination";
import { Product } from "../../app/models/Product";
import ImageInput from "../ImageInput";
import ImageOutput from "../ImageOut";
import { app } from "../../firebase";
import { Button } from "../ui/button";
import Loader from "../theSpotComponents/Loader";
import SelectContainer from "../SelectContainer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ScrollArea from "../ScrollArea";
import { FieldInfo } from "../FieldInfo";
import { Category } from "@/app/models/Category";

interface Props {
  id?: string;
}

const ProductForm: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [images, setImages] = useState<FileList | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const { data: product } = useGetProduct(id!);

  const pageMode: Pagination = { page: 1, pageSize: 100, searchTerm: "" };

  const updateProductMutation = useMutation({
    mutationFn: async (value: Product) => {
      await updateProduct(value);
    },
    onSuccess: () => {
      // Invalidate the products query
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const { data: categories } = useGetCategories(pageMode);

  const createProductMutation = useMutation({
    mutationFn: async (value: Product) => {
      await createProduct(value);
    },
    onSuccess: () => {
      // Invalidate the products query
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const form = useForm<Product>({
    defaultValues: {
      title: product?.title || "",
      imageUrls: product?.imageUrls || [],
      description: product?.description || "",
      cost: product?.cost || 0,
      price: product?.price || 0,
      quantity: product?.quantity || 0,
      category: product?.category || { _id: "", name: "", imageUrls: [] },
    },

    onSubmit: async ({ value }: { value: Product }) => {
      console.log("Product form submitted:", value);
      try {
        if (id) {
          updateProductMutation.mutate({ _id: id, ...value });
        } else {
          createProductMutation.mutate(value);
        }
      } catch (error) {
        console.error("Error submitting product:", error);
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
        () => {},
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
      newImage?.length &&
      newImage.length + form.getFieldValue("imageUrls").length <= 6
    ) {
      setLoadingUpload(true);
      const promises = Array.from(newImage).map((file) => storeImage(file));
      Promise.all(promises)
        .then((urls) => {
          form.setFieldValue("imageUrls", [
            ...(product?.imageUrls || []),
            ...urls,
          ]);
        })
        .catch(() => console.error("Image upload failed"))
        .finally(() => setLoadingUpload(false));
    } else {
      console.error("Maximum of 6 images allowed");
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
    const updatedImageUrls = product?.imageUrls.filter((_, i) => i !== index);
    form.setFieldValue("imageUrls", updatedImageUrls || []);

    console.log("Image deleted successfully");
  };

  console.log(product);
  return (
    <ScrollArea>
      <div className="px-6 py-2 w-90">
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
              name="title"
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
                    Title
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
          {/* Cost and Price */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <form.Field
                name="cost"
                validators={{
                  onChange: ({ value }) =>
                    value < 0
                      ? "Cost cannot be negative"
                      : value > form.getFieldValue("price")
                        ? "Cost cannot be greater than price"
                        : null,
                }}
                children={(field) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium"
                    >
                      Cost
                    </label>
                    <input
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      type="number"
                      min="0"
                      id="cost"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
            <div className="flex-1">
              <form.Field
                name="price"
                children={(field) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium"
                    >
                      Price
                    </label>
                    <input
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      type="number"
                      min="0"
                      id="price"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
          </div>
          {/* Quantity */}
          <div>
            <form.Field
              name="quantity"
              validators={{
                onChange: ({ value }) =>
                  value < 0 ? "Quantity cannot be negative" : null,
              }}
              children={(field) => (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium"
                  >
                    Quantity
                  </label>
                  <input
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    type="number"
                    min="0"
                    id="quantity"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
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
            formData={product?.imageUrls || form.getFieldValue("imageUrls")}
            handleRemoveImage={handleRemoveImage}
          />
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <form.Field
              name="description"
              children={(field) => (
                <textarea
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  id="description"
                  rows={3}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              )}
            />
          </div>
          {/* Category*/}
          <div>
            <SelectContainer
              selectedValue={
                product?.category.name ||
                String(form.getFieldValue("category.name"))
              }
              onValueChange={(value) =>
                form.setFieldValue("category.name", value)
              }
              label={"Categories"}
              options={
                categories?.categories.map((items: Category) => ({
                  id: items._id,
                  name: items.name,
                })) || []
              }
            />
          </div>
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
    </ScrollArea>
  );
};

export default ProductForm;
