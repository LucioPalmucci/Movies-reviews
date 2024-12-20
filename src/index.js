import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import MovieSlider from './Components/MovieSlider';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <MovieSlider API_URL={"https://api.themoviedb.org/3/movie/now_playing"} title={"Latest Movies"}/>
    <MovieSlider API_URL={"https://api.themoviedb.org/3/movie/top_rated"} title={"Best Movies"}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
