import SwiperComponent from "./Swiper"

interface SlideProps{
    id: number;
    image: string;
    title: string;

}
const Header = () => {
    const slides: SlideProps[] = [
        {
          id: 1,
          image: 'https://via.placeholder.com/800x300',
          title: 'Slide 1',
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/800x300',
          title: 'Slide 2',
        },
        {
          id: 3,
          image: 'https://via.placeholder.com/800x300',
          title: 'Slide 3',
        },
      ];
    
  return (
    <header>
        <SwiperComponent slides={slides}/>
    </header>
  )
}
export default Header