import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Box } from '@mui/material';


import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface SlideProps{
  id: number;
  title?: string;
  image: string;
}

interface SwiperProps {
  slides: SlideProps[];
}

const SwiperComponent: React.FC<SwiperProps> = ({ slides }) => {

  return (
    <Box sx={{ my: 4 }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {slides.map((slide: SlideProps) => (
          <SwiperSlide key={slide.id}>
            <Box sx={{ position: 'relative', width: '100%', height: '300px' }}>
              <Box
                component={"img"}
                loading='lazy'
                src={slide.image}
                style={{ width: '100%', height: '100%', objectFit:'scale-down' }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SwiperComponent;
