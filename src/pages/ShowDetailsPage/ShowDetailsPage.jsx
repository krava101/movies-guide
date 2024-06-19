import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentShow } from '../../redux/currentShow/selectors';
import { fetchShowInfo } from '../../redux/currentShow/operations';
import { useEffect } from 'react';
import TVShowPoster from '../../components/TVShow/TVShowPoster/TVShowPoster';
import TVShowInfo from '../../components/TVShow/TVShowInfo/TVShowInfo';
import TVShowDetails from '../../components/TVShow/TVShowDetails/TVShowDetails';
import scss from './ShowDetailsPage.module.scss';

export default function ShowDetailsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const backLink = location.state?.from ?? '/';
  const { showId } = useParams();
  const show = useSelector(selectCurrentShow);

  useEffect(() => {
    showId && dispatch(fetchShowInfo(showId));
  }, [dispatch, showId]);

  return (
    <>
      {show && (
        <section className={scss.show}>
          <Link className={scss.backLink} to={backLink}>
            Go back
          </Link>
          <h1 className={scss.title}>{show.name}</h1>
          <div className={scss.showInfo}>
            <TVShowPoster />
            <TVShowInfo />
          </div>
          <TVShowDetails />
        </section>
      )}
    </>
  );
}
