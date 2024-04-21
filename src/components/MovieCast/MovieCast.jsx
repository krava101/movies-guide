import { useEffect } from "react"
import { useParams } from "react-router-dom";
import css from './MovieCast.module.css';
import { useDispatch, useSelector } from "react-redux";
import { selectCast } from "../../redux/currentMovie/selectors";
import { fetchMovieCast } from "../../redux/currentMovie/operations";

export default function MovieCast() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const cast = useSelector(selectCast);

  useEffect(() => {
    movieId && dispatch(fetchMovieCast(movieId));
  }, [movieId, dispatch])

  const getNameInitials = name => name.split(' ').map(e => e[0]).join('');

  return (
    <>
      <ul className={css.castList}>
        {cast.map(e => 
          <li key={e.id}>
            {e.profile_path ?
              <img src={'https://image.tmdb.org/t/p/w200/' + e.profile_path} alt="Actor's photo" /> :
              <span>{getNameInitials(e.name)}</span>
            }
            <p>{e.name}</p>
          </li>
          )}
      </ul>
    </>
  )
}