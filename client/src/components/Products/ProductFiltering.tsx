/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterList, SwapVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Hidden,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";

type Props = {
  onSort: (sort: string) => void;
  refetch: () => any;
};
const ProductFiltering: FC<Props> = ({ onSort, refetch }) => {
  const onSortHandler = (sort: string) => {
    onSort(sort);
    refetch();
  };
  return (
    <Box>
      <Hidden smDown>
        <Box>
          <Typography variant="h4">Filter</Typography>
          <Divider sx={{ width: 200 }} />
          <Box display={"flex"} flexDirection={"column"}>
            <Button onClick={() => onSortHandler("category")}>Category</Button>
            <Button onClick={() => onSortHandler("price")}>Price</Button>
          </Box>
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box display={"flex"} py={1}>
          <Box display={"flex"} alignItems={"center"}>
            <IconButton>
              <FilterList />
            </IconButton>
            <Typography>Filters</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <IconButton>
              <SwapVert />
            </IconButton>
            <Typography>Sort</Typography>
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};
export default ProductFiltering;
