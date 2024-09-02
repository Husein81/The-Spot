import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      alignItems={"center"}
      justifyContent={"center"}
      flex={1}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};
export default Loader;
