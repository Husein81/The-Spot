import { SwapVert } from "@mui/icons-material";
import { Box, Hidden, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/redux/slice/modalSlice";
import { FC } from "react";
import SelectResponsive from "./SelectResponsive";

type Item = {
  value: string;
  label: string;
};
type Props = {
  selected: string;
  onSort: (sort: string) => void;
};

const ProductSortingResponsive: FC<Props> = ({
  selected,
  onSort: onSortHandler,
}) => {
  const sortItem: Item[] = [
    { value: "createdAt-asc", label: "Date, old to new" },
    { value: "createdAt-desc", label: "Date, new to old" },
    { value: "price-asc", label: "Price from low to high" },
    { value: "price-desc", label: "Price from high to low" },
  ];
  const dispatch = useDispatch();

  const openSortHandler = () => {
    dispatch(
      openModal(
        <SelectResponsive
          title="Sort By"
          items={sortItem}
          selected={selected}
          onSort={onSortHandler}
        />
      )
    );
  };

  return (
    <Hidden smUp>
      <Box display={"flex"} alignItems={"center"}>
        <IconButton onClick={openSortHandler}>
          <SwapVert />
        </IconButton>
        <Typography>Sort</Typography>
      </Box>
    </Hidden>
  );
};
export default ProductSortingResponsive;
