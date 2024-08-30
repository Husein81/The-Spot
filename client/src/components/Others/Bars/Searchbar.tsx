import { Box, Hidden, IconButton, InputBase } from "@mui/material";
import { Pagination } from "../../../app/models/pagination/Pagintation";
import React, { FC } from "react";
import { Search } from "@mui/icons-material";
import { token } from "../../../app/theme/Colors";

type Props = {
  pageModel: Pagination;
  searchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Searchbar: FC<Props> = ({ pageModel, searchTerm }) => {
  const colors = token();

  return (
    <Hidden smDown>
      <Box px={1} borderRadius={1} bgcolor={colors.secondary[500]}>
        <InputBase
          sx={{ flex: 1 }}
          placeholder="Search..."
          name="search"
          type="search"
          value={pageModel.searchTerm}
          onChange={searchTerm}
        />
        <IconButton sx={{ color: colors.primary[500] }}>
          <Search />
        </IconButton>
      </Box>
    </Hidden>
  );
};
export default Searchbar;
