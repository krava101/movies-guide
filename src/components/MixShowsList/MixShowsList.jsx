import { selectIsMixLoading, selectMixShows } from "../../redux/mixShows/selectors";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MovieCard from "../Movie/MovieCard/MovieCard";
import TVShowCard from '../TVShow/TVShowCard/TVShowCard';
import css from './MixShowsList.module.css';

export default function MixShowsList() {
  const [searchParams] = useSearchParams();
  const mix = useSelector(selectMixShows);
  const query = searchParams.get('query');
  const isLoading = useSelector(selectIsMixLoading);

  return (
    <>{mix.length ? 
      <ul className={css.mixList}>
        {mix.filter(e => e.poster_path).map(e => {
          if (e.media_type === 'movie') {
            return <MovieCard key={e.id} movie={e} />
          } else if (e.media_type === 'tv') {
            return <TVShowCard key={e.id} show={e}/>
          }
        })}
      </ul> : !isLoading && query &&
      <div className={css.notFound}>
        <p>Nothing found for request «{query}»</p>
        <p>We couldn&apos;t find anything. Are there any grammatical errors in the query?</p>
      </div>
    }</>
    
  )
}
