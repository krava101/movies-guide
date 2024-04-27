import { Link, useLocation } from "react-router-dom";
import { FaFilm } from "react-icons/fa";
import css from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const location = useLocation();
  return (<>
    <li className={css.moviesListItem}>
      <Link to={`/movie/` + movie.id} state={{ from: location }}>
        <span className={css.icon}><FaFilm/></span>
        <img src={'https://image.tmdb.org/t/p/w400/' + movie.poster_path} alt="Movie img" /> 
        <div>
          <p>{movie.title} </p>
          {movie.release_date && <p>({movie.release_date.slice(0, 4)})</p>}
        </div>
      </Link>
    </li>
  </>)
}