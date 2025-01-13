import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import MovieDetails from './Pages/MovieDetails';
import Reviews from './Pages/Reviews';
import SearchResults from './Pages/SearchResults';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename="/Movies-reviews">
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path='search' element={<SearchResults />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
    <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/now_playing"}/>
    <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/upcoming"}/>
    <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/top_rated"}/>
    <TVshows/>
    <People/>
    <Footer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/
