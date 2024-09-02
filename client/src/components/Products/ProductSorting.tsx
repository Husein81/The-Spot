import { Box, Hidden, MenuItem, Select, Typography } from "@mui/material";
import { FC } from "react";

type Item = {
  value: string;
  label: string;
};
type Props = {
  selected: string;
  onSort: (sort: string) => void;
};
const ProductSorting: FC<Props> = ({ selected, onSort: onSortHandler }) => {
  const menuItems: Item[] = [
    { value: "createdAt-asc", label: "Date, old to new" },
    { value: "createdAt-desc", label: "Date, new to old" },
    { value: "price-asc", label: "Price from low to high" },
    { value: "price-desc", label: "Price from high to low" },
  ];

  return (
    <Box>
      <Hidden smDown>
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Typography variant="h6">Sort By</Typography>
          <Box pb={1}>
            <Select
              value={selected}
              onChange={(e) => onSortHandler(e.target.value as string)}
              variant="standard"
            >
              {menuItems.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Hidden>
      <Hidden mdUp></Hidden>
    </Box>
  );
};
export default ProductSorting;
