import { useParams } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import WelcomePage from '../WelcomePage/WelcomePage';
import MoviesPage from '../MoviesPage/MoviesPage';
import TVShowPage from '../TVShowPage/TVShowPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearMovie } from '../../redux/currentMovie/slice';
import { clearShow } from '../../redux/currentShow/slice';

export default function HomePage() {
  const { showType } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMovie());
    dispatch(clearShow());
  });

  return (
    <>
      <Navigation />
      {showType === 'welcome' && <WelcomePage />}
      {showType === 'movies' && <MoviesPage />}
      {showType === 'shows' && <TVShowPage />}
    </>
  );
}
