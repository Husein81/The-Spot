/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Divider, Hidden, Typography } from "@mui/material";
import { FC } from "react";
import { useGetCategoriesQuery } from "../../app/redux/slice/categoryApi";

type Props = {
  onSort: (sort: string) => void;
  refetch?: () => any;
};
const ProductFiltering: FC<Props> = ({ onSort }) => {
  const { data } = useGetCategoriesQuery({
    page: 1,
    pageSize: 5,
    searchTerm: "",
  });

  const onFilterHandler = (id: string) => {
    onSort(id);
  };
  const categories = data?.categories;
  // console.log(categories[1]._id);
  return (
    <Box>
      <Hidden smDown>
        <Box>
          <Typography textAlign={"center"} variant="h5">
            Filtered By
          </Typography>
          <Divider />
          <Box display={"flex"} flexDirection={"column"}>
            {categories?.map((category) => (
              <Button
                key={category._id}
                onClick={() => onFilterHandler(category._id as string)}
              >
                {category.name}
              </Button>
            ))}
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};
export default ProductFiltering;
