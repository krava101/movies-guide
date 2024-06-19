import { selectCurrentShow } from '../../../redux/currentShow/selectors';
import { useSelector } from 'react-redux';
import scss from './TVShowPoster.module.scss';

export default function TVShowPoster() {
  const show = useSelector(selectCurrentShow);

  return (
    <div className={scss.showPoster}>
      <img
        src={'https://image.tmdb.org/t/p/w400/' + show.poster_path}
        alt="show img"
      />
      {show.homepage && <a href={show.homepage}>Visit homepage</a>}
      <a
        href={
          'https://rezka.ag/search/?do=search&subaction=search&q=' + show.name
        }
      >
        View on HDrezka
      </a>
    </div>
  );
}
