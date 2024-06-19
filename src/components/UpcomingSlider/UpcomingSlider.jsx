import {
  selectIsUpcomingLoading,
  selectUpcoming,
} from '../../redux/upcoming/selectors';
import { useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick/lib/slider';
import SliderCard from '../SliderCard/SliderCard';
import LoadingSlider from '../LoadingSlider/LoadingSlider';
import scss from './UpcomingSlider.module.scss';

export default function UpcomingSlider() {
  const upcoming = useSelector(selectUpcoming);
  const isLoading = useSelector(selectIsUpcomingLoading);

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
    cssEase: 'ease-out',
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 601,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 501,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 376,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const list = Array.from({ length: 7 }, (_, i) => i + 1);

  return (
    <>
      {isLoading ? (
        <Slider Slider {...settings} className={scss.slider}>
          {list.map((_, i) => (
            <LoadingSlider key={i} />
          ))}
        </Slider>
      ) : (
        <Slider Slider {...settings} className={scss.slider}>
          {upcoming.map((e, i) => (
            <SliderCard key={i} movie={e} />
          ))}
        </Slider>
      )}
    </>
  );
}
