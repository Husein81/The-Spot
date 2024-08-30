import { useState } from "react";
import ProductList from "../../components/Products/ProductList";
import { Pagination } from "../models/pagination/Pagintation";
import { useGetProductsQuery } from "../redux/slice/productApi";
import { Box, Typography, Grid2 as Grid } from "@mui/material";
import Loader from "../../components/Others/Loader";
import Searchbar from "../../components/Others/Bars/Searchbar";

import ProductFiltering from "../../components/Products/ProductFiltering";

// import { token } from "../theme/Colors";

const Product = () => {
  // const colors = token();
  const [pageModel, setPageModel] = useState<Pagination>({
    page: 0,
    pageSize: 10,
    searchTerm: "",
    sort: "createdAt",
  });
  const { data, isLoading, refetch } = useGetProductsQuery({
    page: pageModel.page,
    pageSize: pageModel.pageSize,
    searchTerm: pageModel.searchTerm,
    sort: pageModel.sort,
  });
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageModel({ ...pageModel, searchTerm: e.target.value });
  };
  const onSortHandler = (sort: string) => {
    setPageModel({ ...pageModel, sort });
  };
  const products = data?.products || [];
  if (isLoading) return <Loader />;
  return (
    <Box sx={{ px: { sm: 8, xs: 2 } }} mx={"auto"}>
      <Box pt={2}>
        <Searchbar pageModel={pageModel} searchTerm={onSearchHandler} />
      </Box>
      <Box pt={2}>
        <Typography variant="h3">All Products</Typography>
      </Box>
      <Box pt={2}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 2 }}>
            <ProductFiltering refetch={refetch} onSort={onSortHandler} />
          </Grid>
          <Grid size={{ xs: 12, md: 10 }}>
            <ProductList products={products} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default Product;
