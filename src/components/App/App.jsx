import { lazy, Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import SimilarMovieList from "../SimilarMovieList/SimilarMovieList";
import Navigation from "../Navigation/Navigation";
import Layout from "../Layout/Layout";
const HomePage = lazy(()=> import("../../pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const NotFound = lazy (() => import("../../pages/NotFound/NotFound"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy (() =>  import("../MovieReviews/MovieReviews"));

const App = () => {  
  return (
      <Layout>
      <Navigation/>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast/>} />
              <Route path="reviews" element={<MovieReviews />} />
              <Route path="similar" element={<SimilarMovieList/>} />
            </Route>
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Suspense>
      </Layout>
  )
}

export default App;