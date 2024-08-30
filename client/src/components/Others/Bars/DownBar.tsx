import { Box, Button, Divider, Drawer, InputBase } from "@mui/material";
import { FC } from "react";
import { Pagination } from "../../../app/models/pagination/Pagintation";
import { Search } from "@mui/icons-material";
// import { token } from "../../app/theme/Colors";
import { useGetProductsQuery } from "../../../app/redux/slice/productApi";
import Loader from "../Loader";
type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  pageModel: Pagination;
  searchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const DownBar: FC<Props> = ({ toggle, setToggle, pageModel, searchTerm }) => {
  // const colors = token();
  const { data: products, isLoading } = useGetProductsQuery({
    page: pageModel.page,
    pageSize: pageModel.pageSize,
    searchTerm: pageModel.searchTerm,
  });
  const toggleHandler = () => {
    setToggle(false);
  };
  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": { height: "100vh" },
      }}
      open={toggle}
      anchor="bottom"
    >
      <Box m={2} display={"flex"} justifyContent={"space-between"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          border={1}
          borderRadius={1}
          p={1}
        >
          <InputBase
            placeholder="Search..."
            onChange={searchTerm}
            value={pageModel.searchTerm}
          />
          <Search />
        </Box>
        <Button variant={"contained"} onClick={toggleHandler}>
          Cancel
        </Button>
      </Box>
      <Divider />
      <Box>
        {pageModel.searchTerm !== "" &&
          (isLoading ? (
            <Loader />
          ) : (
            products?.products.map((product) => (
              <Box
                key={product._id}
                m={2}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box component={"img"} src={product.imageUrls[0]} width={50} />
                <Box>{product.title}</Box>
              </Box>
            ))
          ))}
      </Box>
    </Drawer>
  );
};
export default DownBar;
