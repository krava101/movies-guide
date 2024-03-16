import { lazy, Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import css from './App.module.css';
import { DNA } from "react-loader-spinner";
import Navigation from "../Navigation/Navigation";
const HomePage = lazy(()=> import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(()=> import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const NotFound = lazy (() => import("../../pages/NotFound/NotFound"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy (() =>  import("../MovieReviews/MovieReviews"));

const App = () => {  
  return (
    <>
      <Navigation/>
      <Suspense fallback={
        <div className={css.loading}>
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperClass="dna-wrapper"/>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage/>}/>
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast/>} />
            <Route path="reviews" element={<MovieReviews/>} />
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App;