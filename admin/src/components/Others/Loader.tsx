import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

type Props = {
  color?: string;
};
const Loader: FC<Props> = ({ color = "#0080ff" }) => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress sx={{ color: color }} />
    </Box>
  );
};
export default Loader;
