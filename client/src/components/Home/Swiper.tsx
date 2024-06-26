import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Box, Typography, Container } from '@mui/material';


import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface SlideProps{
  id: number;
  title: string;
  image: string;
}

interface SwiperProps {
  slides: SlideProps[];
}

const SwiperComponent: React.FC<SwiperProps> = ({ slides }) => {

  return (
    <Container sx={{ my: 4 }}>
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
              <img
                src={slide.image}
                alt={slide.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Typography
                variant="h4"
                sx={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  color: '#fff',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '10px',
                }}
              >
                {slide.title}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default SwiperComponent;
