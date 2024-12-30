import { useState } from "react";
import { useGetAllProducts } from "../api/products";
import { Pagination as PaginationMode } from "../models/Pagination/pagination";
import ProductList from "../../components/Products/ProductList";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slice/modalSlice";
import ProductForm from "../../components/Products/ProductForm";
// import Loader from "../../components/Loader";
import IconButton from "@/components/theSpotComponents/IconButton";
import { Pagination } from "@/components/theSpotComponents/Pagination";
import Loader from "@/components/theSpotComponents/Loader";

const Products = () => {
  const dispatch = useDispatch();
  const [pageMode, setPageMode] = useState<PaginationMode>({
    page: 1,
    pageSize: 8,
    searchTerm: "",
  });

  const paginationHandler = (pageMode: PaginationMode) => {
    setPageMode(pageMode);
  };

  const { isPending, data } = useGetAllProducts(pageMode);

  const products = data?.products || [];

  const onOpenHandler = () => {
    dispatch(openModal(<ProductForm />));
  };

  if (isPending) return <Loader size="lg" />;
  return (
    <div className="flex flex-col">
      <div className="my-4 w-full flex justify-end">
        <IconButton
          className="w-full sm:w-fit"
          icon={<Add />}
          label="Add Product"
          onClick={onOpenHandler}
        />
      </div>

      <div className="mt-4">
        <ProductList products={products} />
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={pageMode.page}
          totalPages={data?.totalPages || 1}
          onPageChange={(page: number) =>
            paginationHandler({ ...pageMode, page })
          }
        />
      </div>
    </div>
  );
};
export default Products;
