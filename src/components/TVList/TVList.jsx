import { selectIsLoading, selectShows  } from "../../redux/shows/selectors";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TVShowCard from "../TVShowCard/TVShowCard";
import css from './TVList.module.css';

export default function TvList() {
  const [searchParams] = useSearchParams();
  const shows = useSelector(selectShows);
  const query = searchParams.get('query');
  const isLoading = useSelector(selectIsLoading);

  return (
    <>{shows.length ? 
      <ul className={css.tvList}>
        {shows.filter(e => e.poster_path).map(e => (<TVShowCard key={e.id} show={e} />))}
      </ul> : !isLoading &&
      <div className={css.notFound}>
        <p>Nothing found for request «{query}»</p>
        <p>We couldn&apos;t find anything. Are there any grammatical errors in the query?</p>
      </div>
    }</>
    
  )
}