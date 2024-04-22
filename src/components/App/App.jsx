import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SimilarMovieList from "../SimilarMovieList/SimilarMovieList";
import Navigation from "../Navigation/Navigation";
import Layout from "../Layout/Layout";

const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const ShowDetailsPage = lazy(() => import("../../pages/ShowDetailsPage/ShowDetailsPage"));
const MovieReviews = lazy (() =>  import("../Movie/MovieReviews/MovieReviews"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieCast = lazy(() => import("../Movie/MovieCast/MovieCast"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const NotFound = lazy (() => import("../../pages/NotFound/NotFound"));
const TVShowPage = lazy(()=> import("../../pages/TVShowPage/TVShowPage"));

const App = () => {  
  return (
    <Layout>
    <Navigation/>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast/>} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="similar" element={<SimilarMovieList/>} />
          </Route>
          <Route path="/shows" element={<TVShowPage />} />
          <Route path="/show/:showId" element={<ShowDetailsPage/>}></Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App;