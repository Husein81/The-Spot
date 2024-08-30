import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import { FC } from "react";

type Props = {
  imageUrls: string[];
};
const SwiperComponent: FC<Props> = ({ imageUrls }) => {
  return (
    <Box border={1} height={500}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <Box
              component={"img"}
              height={500}
              width={"100%"}
              sx={{ objectFit: "cover" }}
              src={url}
              alt={`slide-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
export default SwiperComponent;
