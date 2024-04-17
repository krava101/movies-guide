import { selectCurrentMovie } from "../../redux/currentMovie/selectors";
import { useSelector } from "react-redux";
import MovieInfoList from "../MovieInfoList/MovieInfoList";
import css from './MovieInfo.module.css';


export default function MovieInfo() {
  const movie = useSelector(selectCurrentMovie);

  return (
    <div className={css.movieInfo}> 
      <p>Raiting: <span>{movie.vote_average}</span></p>
      <MovieInfoList array={movie.genres}>Genres:</MovieInfoList>
      {movie.tagline && <p>Tagline: <span>{movie.tagline}</span></p>}
      <p>Release: <span>{movie.release_date}</span></p>
      <MovieInfoList array={movie.production_countries}>Countries: </MovieInfoList>
      <MovieInfoList array={movie.spoken_languages}>Spoken languages: </MovieInfoList>
      <p>Budget: <span>{movie.budget ? '$'+ movie.budget : 'No data'}</span></p>
      <p>Revenue: <span>{movie.revenue ? '$'+movie.revenue : 'No data'}</span></p>
      <p>Time: <span>{movie.runtime} min.</span></p>
      <p className={css.overview}>Overview: <span>{movie.overview}</span></p>
    </div>
  )
}