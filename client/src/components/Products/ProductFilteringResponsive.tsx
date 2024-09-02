import { FilterList } from "@mui/icons-material";
import { Box, Hidden, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/redux/slice/modalSlice";
import { FC } from "react";
import SelectResponsive from "./SelectResponsive";
import { useGetCategoriesQuery } from "../../app/redux/slice/categoryApi";

type Item = {
  value: string;
  label: string;
};
type Props = {
  selected: string;
  onSort: (sort: string) => void;
};

const ProductFilteringResponsive: FC<Props> = ({
  selected,
  onSort: onSortHandler,
}) => {
  const { data } = useGetCategoriesQuery({
    page: 1,
    pageSize: 5,
    searchTerm: "",
  });
  const categories = data?.categories;

  const filterItem: Item[] =
    categories?.map((category) => ({
      value: category._id as string,
      label: category.name,
    })) || [];

  const dispatch = useDispatch();

  const openFilterHandler = () => {
    dispatch(
      openModal(
        <SelectResponsive
          title="Filter By"
          items={filterItem}
          selected={selected}
          onSort={onSortHandler}
        />
      )
    );
  };
  return (
    <Hidden smUp>
      <Box display={"flex"} alignItems={"center"}>
        <IconButton onClick={openFilterHandler}>
          <FilterList />
        </IconButton>
        <Typography>Filters</Typography>
      </Box>
    </Hidden>
  );
};
export default ProductFilteringResponsive;
