import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Searchbar from "./Searchbar";
import { Pagination } from "../../../app/models/pagination/Pagintation";
import React, { FC, useState } from "react";
import { token } from "../../../app/theme/Colors";
import { Menu, Search, ShoppingBagOutlined } from "@mui/icons-material";
import DownBar from "./DownBar";

type Props = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
const Navbar: FC<Props> = ({ setToggle }) => {
  const colors = token();
  const [downToggle, setDownToggle] = useState(false);
  const [pageModel, setPageModel] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
  });
  const searchTermHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageModel({ ...pageModel, searchTerm: e.target.value });
  };
  const toggleHandler = () => {
    setToggle((toggle) => !toggle);
  };

  const downToggleHandler = () => {
    setDownToggle((downToggle) => !downToggle);
  };

  const ToolbarSX = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  };
  return (
    <AppBar position="static">
      <Toolbar sx={ToolbarSX}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <IconButton color="secondary" onClick={toggleHandler}>
            <Menu />
          </IconButton>
          <Hidden smUp>
            <IconButton color="secondary" onClick={downToggleHandler}>
              <Search />
            </IconButton>
          </Hidden>
          <Typography variant="h6" color={colors.secondary[500]}>
            The Spot
          </Typography>
        </Box>
        <Box>
          <Searchbar pageModel={pageModel} searchTerm={searchTermHandler} />
        </Box>
        <IconButton color="secondary">
          <ShoppingBagOutlined sx={{ fontSize: 32 }} />
        </IconButton>
        <DownBar
          toggle={downToggle}
          setToggle={setDownToggle}
          pageModel={pageModel}
          searchTerm={searchTermHandler}
        />
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
