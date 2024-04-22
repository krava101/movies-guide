import { selectUpcoming } from '../../redux/upcoming/selectors';
import { useSelector } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import css from './UpcomingSlider.module.css';
import Slider from 'react-slick/lib/slider';
import SliderCard from '../SliderCard/SliderCard';

export default function UpcomingSlider() {
  const upcoming = useSelector(selectUpcoming);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    slidesToShow: 7,
    slidesToScroll: 7,
    draggable: false,
    cssEase: "ease-out"
  };


  return (
    <Slider {...settings} className={css.slider}>
      {upcoming.map((e, i) => <SliderCard key={i} movie={e}/>)}
    </Slider>
  )
}