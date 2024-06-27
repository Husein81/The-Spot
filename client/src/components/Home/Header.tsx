import SwiperComponent from "./Swiper"

interface SlideProps{
    id: number;
    image: string;
    title?: string;

}
const Header = () => {
    const slides: SlideProps[] = [
        {
          id: 1,
          image: '../../../public/assets/home-img.jpeg',
        },
        {
          id: 2,
          image: '../../../public/assets/home-img2.jpg',
          title: 'Slide 2',
        },
      ];
    
  return (
    <header>
        <SwiperComponent slides={slides}/>
    </header>
  )
}
export default Header