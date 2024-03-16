import MovieCard from "../MovieCard/MovieCard";
import css from './MoviesList.module.css';

export default function MoviesList({movies}) {
  return (
    <ul className={css.moviesList}>
      {movies.map(e => (<MovieCard key={e.id} movie={e} />))}
    </ul>
  )
}