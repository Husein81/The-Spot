import { useState } from "react";
import ProductList from "../../components/Products/ProductList";
import { Pagination as PaginationModel } from "../models/pagination/Pagintation";
import {
  useGetProductByCategoryQuery,
  useGetProductsQuery,
} from "../redux/slice/productApi";
import { Box, Typography, Grid2 as Grid, Pagination } from "@mui/material";
import Loader from "../../components/Others/Loader";
import Searchbar from "../../components/Others/Bars/Searchbar";

import ProductFiltering from "../../components/Products/ProductFiltering";
import ProductSorting from "../../components/Products/ProductSorting";
import ProductSortingResponsive from "../../components/Products/ProductSortingResponsive";
import ProductFilteringResponsive from "../../components/Products/ProductFilteringResponsive";

// import { token } from "../theme/Colors";

const Products = () => {
  // const colors = token();
  const [pageModel, setPageModel] = useState<PaginationModel>({
    page: 1,
    pageSize: 5,
    searchTerm: "",
    sort: "createdAt",
    order: "desc",
  });
  const [selected, setSelected] = useState("createdAt-desc");
  const { data, isLoading, refetch } = useGetProductsQuery({
    page: pageModel.page,
    pageSize: pageModel.pageSize,
    searchTerm: pageModel.searchTerm,
    sort: pageModel.sort,
    order: pageModel.order,
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: categories } = useGetProductByCategoryQuery({
    page: pageModel.page,
    pageSize: pageModel.pageSize,
    category: selectedCategory,
  });
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageModel({ ...pageModel, searchTerm: e.target.value });
  };
  const onSortHandler = (value: string) => {
    const sort = value.split("-")[0];
    const order = value.split("-")[1] === "asc" ? "asc" : "desc";

    setSelected(value);
    setPageModel({ ...pageModel, sort, order });
  };

  const onFilterHandler = (id: string) => {
    setSelectedCategory(id);
  };
  const onPageChangeHandler = (page: number) => {
    setPageModel({ ...pageModel, page });
  };
  const products = data?.products || [];
  const categoriesProduct = categories?.products || [];
  console.log(selectedCategory, categories);

  if (isLoading) return <Loader />;
  return (
    <Box
      sx={{ px: { sm: 8, xs: 2 } }}
      mx={"auto"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box pt={2}>
        <Searchbar pageModel={pageModel} searchTerm={onSearchHandler} />
      </Box>
      <Box pt={2}>
        <Typography align="center" variant="h4">
          All Products
        </Typography>
      </Box>
      <Box pt={2}>
        <Grid container spacing={{ xs: 0, sm: 6 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <ProductFiltering refetch={refetch} onSort={onFilterHandler} />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Box display={"flex"}>
              <ProductFilteringResponsive
                selected={selectedCategory}
                onSort={onFilterHandler}
              />
              <ProductSortingResponsive
                selected={selected}
                onSort={onSortHandler}
              />
            </Box>
            <ProductSorting selected={selected} onSort={onSortHandler} />

            <ProductList
              products={selectedCategory !== "" ? categoriesProduct : products}
            />
          </Grid>
        </Grid>
      </Box>
      <Box pt={2} display="flex" justifyContent="center" alignItems={"center"}>
        <Pagination
          count={data?.totalPages || 0}
          page={pageModel.page}
          shape={"rounded"}
          variant="outlined"
          onChange={(_e, page) => onPageChangeHandler(page)}
        />
      </Box>
    </Box>
  );
};
export default Products;
