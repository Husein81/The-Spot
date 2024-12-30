import { useState } from "react";
import { Product } from "../../app/models/Product";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../app/redux/slice/modalSlice";
import ProductForm from "./ProductForm";
import WarningForm from "../WarningForm";
import { deleteProduct } from "../../app/api/products";
import { Pencil, Trash } from "lucide-react";
import { Category } from "@/app/models/Category";
import CategoryForm from "../Categories/CategoryForm";
import { deleteCategory } from "@/app/api/categories";
import IconButton from "../theSpotComponents/IconButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  item: Product | Category;
  type?: "product" | "category";
}

const Card = ({ item, type = "product" }: Props) => {
  const img1: string = item.imageUrls[0];
  const img2: string = item.imageUrls[1];

  const queryClient = useQueryClient();
  const [image, setImage] = useState(img1);
  const dispatch = useDispatch();

  const onEditHandler = () => {
    dispatch(
      openModal(
        type === "product" ? (
          <ProductForm id={item._id} />
        ) : (
          <CategoryForm id={item._id} />
        )
      )
    );
  };

  const deleteCategoryMutation = useMutation({
    mutationFn: async () => {
      await deleteCategory(item._id as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async () => {
      await deleteProduct(item._id as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const onDeleteHandler = async () => {
    try {
      if (type === "product") deleteProductMutation.mutate();
      else deleteCategoryMutation.mutate();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(closeModal());
    }
  };

  const onWarningHandler = () => {
    dispatch(openModal(<WarningForm deleteItem={onDeleteHandler} />));
  };

  return (
    <div className="rounded-lg shadow-lg overflow-hidden bg-white cursor-pointer">
      {/* Product Image */}
      <img
        src={image}
        alt={
          type === "product" ? (item as Product).title : (item as Category).name
        }
        className="w-full h-64 object-contain transition-transform duration-200 hover:scale-105"
        onMouseOver={() => setImage(img2)}
        onMouseLeave={() => setImage(img1)}
      />

      {/* Product Details */}
      <div className="p-4">
        {type === "product" ? (
          <div>
            <h3 className="text-lg font-semibold">{(item as Product).title}</h3>
            <p className="text-gray-500 mt-1">
              ${(item as Product).price.toFixed(2)}
            </p>
          </div>
        ) : (
          <h3 className="text-lg font-semibold">{(item as Category).name}</h3>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200">
        <IconButton icon={<Pencil size={"lg"} />} onClick={onEditHandler} />
        <IconButton
          className="bg-red-600 "
          icon={<Trash />}
          onClick={onWarningHandler}
        />
      </div>
    </div>
  );
};

export default Card;
