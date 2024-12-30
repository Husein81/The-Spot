import CategoryList from "../../components/Categories/CategoryList";
import { useGetCategories } from "../api/categories";
import { Pagination } from "../models/Pagination/pagination";
import { useState } from "react";
import Loader from "../../components/theSpotComponents/Loader";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slice/modalSlice";
import CategoryForm from "../../components/Categories/CategoryForm";
import { Pagination as PaginationMode } from "@/components/theSpotComponents/Pagination";
import IconButton from "@/components/theSpotComponents/IconButton";

const Categories = () => {
  const dispatch = useDispatch();
  const [pageMode, setPageMode] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
  });

  const { isPending, data: categories } = useGetCategories(pageMode);

  const onOpenHandler = () => {
    dispatch(openModal(<CategoryForm />));
  };

  const data = categories?.categories || [];

  if (isPending) {
    return <Loader size="lg" />;
  }
  return (
    <div className="flex flex-col">
      <div className="my-4 w-full block sm:flex sm:justify-end">
        <IconButton
          className="sm:w-fit w-full"
          icon={<Add />}
          label="Add Category"
          onClick={onOpenHandler}
        />
      </div>
      <div className="mt-4">
        <CategoryList categories={data} />
      </div>

      <div className="mt-4">
        <PaginationMode
          currentPage={pageMode.page}
          totalPages={categories?.totalPages || 1}
          onPageChange={(page) => setPageMode({ ...pageMode, page })}
        />
      </div>
    </div>
  );
};
export default Categories;
