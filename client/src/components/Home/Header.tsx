import { Box } from "@mui/material";
import Swiper from "./Swiper";

const Header = () => {
  const imageUrls = [
    "/assets/Untitleddesign_36_5d16f090-2e51-49ab-8a33-586c9bd532b7_302x302.jpg",
    "/assets/Sami_38_2cf66a12-fc1e-405c-910f-a1fe52a41eaa_222x222.jpg",
  ];
  return (
    <Box>
      <Swiper imageUrls={imageUrls} />
    </Box>
  );
};
export default Header;
