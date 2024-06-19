import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieCast } from '../../../redux/currentMovie/operations';
import { selectCast } from '../../../redux/currentMovie/selectors';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import scss from './MovieCast.module.scss';

export default function MovieCast() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const cast = useSelector(selectCast);

  useEffect(() => {
    movieId && dispatch(fetchMovieCast(movieId));
  }, [movieId, dispatch]);

  const getNameInitials = name =>
    name
      .split(' ')
      .map(e => e[0])
      .join('');

  return (
    <>
      <ul className={scss.castList}>
        {cast.map((e, i) => (
          <li key={i}>
            {e.profile_path ? (
              <img
                src={'https://image.tmdb.org/t/p/w200/' + e.profile_path}
                alt="Actor's photo"
              />
            ) : (
              <span>{getNameInitials(e.name)}</span>
            )}
            <p>{e.name}</p>
            <p>{e.known_for_department}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
