import { Search } from "@mui/icons-material";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";

const SearchInput = () => {
  return (
    <FormControl variant="outlined" sx={{ wisth: { xs: "100%", md: "25ch" } }}>
      <OutlinedInput
        size="small"
        placeholder="Search..."
        sx={{ flexGrow: 1, borderRadius: 2 }}
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
export default SearchInput;
