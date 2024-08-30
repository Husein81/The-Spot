import { Box } from "@mui/material";
import Swiper from "./Swiper";

const Header = () => {
  const imageUrls = ["/assets/Watch1.jpg", "/assets/Watch2.jpg"];
  return (
    <Box>
      <Swiper imageUrls={imageUrls} />
    </Box>
  );
};
export default Header;
