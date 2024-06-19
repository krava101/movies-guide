import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useDispatch } from 'react-redux';
import { changeFilter, changePage, setSearch } from '../../redux/filter/slice';

const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const SimilarMovieList = lazy(() =>
  import('../Movie/SimilarMovieList/SimilarMovieList')
);
const TVShowSimilarList = lazy(() =>
  import('../TVShow/TVShowSimilarList/TVShowSimilarList')
);
const ShowDetailsPage = lazy(() =>
  import('../../pages/ShowDetailsPage/ShowDetailsPage')
);
const MovieReviews = lazy(() => import('../Movie/MovieReviews/MovieReviews'));
const TVShowCast = lazy(() => import('../TVShow/TVShowCast/TVShowCast'));
const TVShowReviews = lazy(() =>
  import('../TVShow/TVShowReviews/TVShowReviews')
);
const MovieCast = lazy(() => import('../Movie/MovieCast/MovieCast'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));

const App = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const filter = searchParams.get('filter');
  const page = searchParams.get('page');
  const search = searchParams.get('search');

  useEffect(() => {
    filter && dispatch(changeFilter(filter));
    search && dispatch(setSearch(search));
    page && dispatch(changePage(page));
  }, [dispatch, filter, page, search]);

  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Navigate to={'/welcome'} />} />
          <Route path="/:showType" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="similar" element={<SimilarMovieList />} />
          </Route>
          <Route path="/show/:showId" element={<ShowDetailsPage />}>
            <Route path="cast" element={<TVShowCast />} />
            <Route path="reviews" element={<TVShowReviews />} />
            <Route path="similar" element={<TVShowSimilarList />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
