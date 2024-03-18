import MovieCard from "../MovieCard/MovieCard";
import css from './MovieList.module.css';

export default function MovieList({movies}) {
  return (
    <ul className={css.moviesList}>
      {movies.map(e => (<MovieCard key={e.id} movie={e} />))}
    </ul>
  )
}