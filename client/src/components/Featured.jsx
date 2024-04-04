import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRef } from 'react';
import { IoMdCart } from 'react-icons/io';
import { Box, Button, Grid, Typography } from '@mui/material';
import img1 from '../assets/Apple-Macbook-Pro-Transparent-Image.png';
import img2 from '../assets/airpods Pro.png';
import { useAuth } from '../context/authProvider';

const Featured = () => {
  const { currentUser } = useAuth();
  const swiperRef = useRef(null);
  const isLoggedOut = !currentUser ? true : false;

  const swiperConfig = {
    slidesPerView: 1,
    effect: 'fade',
    loop: true,
    autoplay: {
      delay: 5000, 
      disableOnInteraction: false, 
    },
  };

  const products = [
    {
      title: 'MacBook Pro',
      description: `Immerse yourself in a world of convenience and diverse products with The Spot, your one-stop shop for all your needs. Browse our extensive online catalog, featuring everything from everyday essentials to unique finds, all curated with exceptional quality in mind. Enjoy seamless navigation, secure payment options, and efficient delivery to get your purchases straight to your door. Whether you're a seasoned shopper or a curious newcomer, The Spot welcomes you to explore and discover the perfect products to enhance your life.`,
      image: img1, // Assuming the image is static
    },
    {
      title: 'iPhone 14 Pro',
      description: `The iPhone 14 Pro delivers a powerful A15 Bionic chip for smooth performance and stunning visuals on its Super Retina XDR display. Capture incredible photos and videos in any light with its improved camera system. Available in a range of colors, the iPhone 14 seamlessly integrates advanced technology with a sleek and durable design.`,
      image: img2, // Assuming the image is static
    },
  ];

  return (
    <Grid container spacing={2} margin={'normal'} sx={{ backgroundColor: '#222' }}>
      <Swiper ref={swiperRef} {...swiperConfig}>
        {products.map((product) => (
          <SwiperSlide key={product.title}>
            <Grid container mx={'auto'} p={2} maxWidth={1080}>
              <Grid item xs={12} sm={6}>
                <img src={product.image} alt={product.title} className="w-full h-full" />
              </Grid>
              <Grid item xs={12} sm={6} textAlign={'center'}>
                <Typography variant="h5" component="h1" className="text-gray-100" pt={10}>
                  {product.title}
                </Typography>
                <Typography variant="body2" className="text-justify text-gray-500 ">
                  {product.description}
                </Typography>
                <Box display="flex" gap={2} py={1}>
                  <Button  variant="outlined">Read More</Button>
                  <Button disabled={isLoggedOut} variant="contained" endIcon={<IoMdCart />}>
                  {isLoggedOut? 'Sign in First' : 'Add to Cart'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default Featured;
