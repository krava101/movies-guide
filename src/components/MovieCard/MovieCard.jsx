import { Link, useLocation } from "react-router-dom";
import css from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const location = useLocation();
  return (<>
    <li className={css.moviesListItem}>
      <Link to={`/movie/` + movie.id} state={{from: location}}>
        <img src={'https://image.tmdb.org/t/p/w400/' + movie.poster_path} alt="Movie img" /> 
        <div>
          <p>{movie.original_title} </p>
          <p>({movie.release_date.slice(0, 4)})</p>
        </div>
      </Link>
    </li>
  </>)
}