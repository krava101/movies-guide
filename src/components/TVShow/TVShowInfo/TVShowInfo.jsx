import { selectCurrentShow } from '../../../redux/currentShow/selectors';
import { useSelector } from 'react-redux';
import MovieInfoList from '../../MovieInfoList/MovieInfoList';
import scss from './TVShowInfo.module.scss';

export default function TVShowInfo() {
  const show = useSelector(selectCurrentShow);

  return (
    <>
      <div className={scss.showInfo}>
        <p>
          Raiting:{' '}
          <span>
            {' '}
            <a href="https://www.themoviedb.org/">TMDb:</a> &nbsp;
            {show.vote_average}
          </span>
        </p>
        <p>
          Status:{' '}
          <span>{show.in_production ? 'In production' : 'Completed'}</span>
        </p>
        <MovieInfoList array={show.genres}>Genres:</MovieInfoList>
        {show.tagline && (
          <p>
            Tagline: <span>{show.tagline}</span>
          </p>
        )}
        <p>
          Release: <span>{show.first_air_date}</span>
        </p>
        <MovieInfoList array={show.production_countries}>
          Countries:{' '}
        </MovieInfoList>
        <MovieInfoList array={show.spoken_languages}>Languages: </MovieInfoList>
        {show.episode_run_time.length > 0 && (
          <p>
            Time: <span>{show.episode_run_time[0]} min.</span>
          </p>
        )}
        <p className={scss.overview}>
          Overview: <span>{show.overview}</span>
        </p>
      </div>
    </>
  );
}
