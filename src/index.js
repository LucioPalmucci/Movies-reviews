import React from 'react';
import ReactDOM from 'react-dom/client';
import Footer from './Components/Footer';
import MovieSliders from './Components/MovieSliders';
import NavBar from './Components/NavBar';
import People from './Components/People';
import TVshows from './Components/TVshows';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
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
reportWebVitals();
