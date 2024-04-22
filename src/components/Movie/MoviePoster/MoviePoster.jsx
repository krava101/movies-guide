import { selectCurrentMovie } from '../../../redux/currentMovie/selectors';
import { useSelector } from 'react-redux';
import css from './MoviePoster.module.css';

export default function MoviePoster() {
  const movie = useSelector(selectCurrentMovie);

  return (
    <div className={css.moviePoster}>
      <img src={'https://image.tmdb.org/t/p/w400/' + movie.poster_path} alt="Movie img" />
      {movie.homepage && <a href={movie.homepage}>Visit homepage</a>}
      <a href={"https://rezka.ag/search/?do=search&subaction=search&q=" + movie.title}>View on HDrezka</a>
    </div >
  )
}