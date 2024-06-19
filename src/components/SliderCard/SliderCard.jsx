import { Link } from 'react-router-dom';
import scss from './SliderCard.module.scss';

export default function SliderCard({ movie }) {
  return (
    <div className={scss.sliderItem}>
      <Link to={`/movie/` + movie.id}>
        <img
          src={'https://image.tmdb.org/t/p/w400/' + movie.poster_path}
          alt="Movie img"
        />
        <div>
          <p>{movie.title} </p>
          <p>({movie.release_date.slice(0, 4)})</p>
        </div>
      </Link>
    </div>
  );
}
