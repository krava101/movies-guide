import { Link, useLocation } from "react-router-dom";
import css from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const location = useLocation();
  return (<>
    <li className={css.moviesListItem}>
      <Link to={`/movies/` + movie.id} state={{from: location}}>
        {movie.poster_path ?
          <img src={'https://image.tmdb.org/t/p/w400/' + movie.poster_path} alt="Movie img" /> :
          <span>{movie.original_title}</span>}
        <div>
          <p>{movie.original_title} ({movie.release_date.slice(0, 4)})</p>
        </div>
      </Link>
    </li>
  </>)
}