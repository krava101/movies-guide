import { selectIsLoading, selectMovies } from "../../redux/movies/selectors";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import css from './MovieList.module.css';

export default function MovieList() {
  const [searchParams] = useSearchParams();
  const movies = useSelector(selectMovies);
  const query = searchParams.get('query');
  const isLoading = useSelector(selectIsLoading);
  return (
    <>{movies.length ? 
      <ul className={css.moviesList}>
        {movies.filter(e => e.poster_path).map(e => (<MovieCard key={e.id} movie={e} />))}
      </ul> : !isLoading &&
      <div className={css.notFound}>
        <p>Nothing found for request «{query}»</p>
        <p>We couldn&apos;t find anything. Are there any grammatical errors in the query?</p>
      </div>
      
    }</>
    
  )
}