import { Container, useTheme } from "@mui/material";
import { token } from "../theme/Colors";
import { useState } from "react";
import { Pagination } from "../model/pagination/Pagintation";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slice/modalSlice";
import CategoryForm from "../../components/Category/CategoryForm";
import { useGetCategoriesQuery } from "../redux/slice/categoryApi";
import CategoryTable from "../../components/Category/CategoryTable";
import CategoryHeader from "../../components/Category/CategoryHeader";

const Category = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  const [pageModel, setPageModel] = useState<Pagination>({
    page: 0,
    pageSize: 10,
    searchTerm: "",
  });
  const dispatch = useDispatch();

  const {
    data: categories,
    isLoading,
    refetch,
  } = useGetCategoriesQuery({
    page: pageModel.page + 1,
    pageSize: pageModel.pageSize,
    searchTerm: pageModel.searchTerm,
  });
  console.log(categories);
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageModel({ ...pageModel, searchTerm: e.target.value });
  };
  const onAddHandler = () => {
    dispatch(openModal(<CategoryForm refetch={refetch} />));
  };
  return (
    <Container>
      <CategoryHeader
        onSearchHandler={onSearchHandler}
        onAddHandler={onAddHandler}
        colors={colors}
        pageModel={pageModel}
      />

      <CategoryTable
        colors={colors}
        data={categories!}
        isLoading={isLoading}
        pageModel={pageModel}
        refetch={refetch}
        setPageModel={setPageModel}
      />
    </Container>
  );
};
export default Category;
