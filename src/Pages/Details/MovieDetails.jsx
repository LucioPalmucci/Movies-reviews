import { faCheckToSlot, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import translations from '../../Components/translations';
import ReviewsMedia from './ReviewsMedia';
const API_KEY = 'e64b602aba57474ef266dbb22be5f8db';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        const appElement = document.querySelector('.App');
        const observer = new MutationObserver(() => {
            const newLanguage = appElement.classList.contains('es') ? 'es' : 'en';
            setLanguage(newLanguage);
        });

        //Cuando la clase cambia, se ejecuta el observer
        observer.observe(appElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            observer.disconnect();
        };
    }, []);

    const t = translations[language];

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: API_KEY,
                        language: language === 'es' ? 'es-MX' : 'en-US',
                    }
                });
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError('Error fetching movie details');
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
                    params: {
                        api_key: API_KEY,
                        language: language === 'es' ? 'es-MX' : 'en-US',
                    }
                });
                setReviews(response.data.results);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Error fetching reviews');
            }
        };

        fetchMovieDetails();
        fetchReviews();
    }, [id, language]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!movie) {
        return <div>No movie details found.</div>;
    }

    return (
        <div>
            <div className='m-4 px-44 flex font-Rubik justify-evenly mt-10 space-x-10 items-center'>
                <div>
                    <h1 className="text-3xl font-bold mb-2 py-2">{movie.title}</h1>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className='p-10 rounded bg-gray-200 m-10 align-center flex flex-col h-full dark:bg-neutral-700'>
                    <p><b>{t.movieDetails.Overview}:</b> {movie.overview}</p>
                    <p><b>{t.movieDetails.ReleaseDate}:</b> {movie.release_date}</p>
                    <p><b>{t.movieDetails.Genres}:</b> {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p><b>{t.movieDetails.Production}:</b> {movie.production_companies.map(company => company.name).join(', ')}</p>
                    <p><b>{t.movieDetails.Budget}:</b> {movie.budget}$ USD</p>
                    <p><b>{t.movieDetails.Revenue}:</b> {movie.revenue}$ USD</p>
                    <p><b>{t.movieDetails.Runtime}:</b> {movie.runtime} minutes</p>
                    <p><FontAwesomeIcon icon={faStar} className='text-yellow-400' />{movie.vote_average.toFixed(1)}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCheckToSlot} color='rgb(0, 255, 0)' />{movie.vote_count}</p>
                </div>
            </div>
            <ReviewsMedia reviews={reviews} language={language} />
        </div>
    );
}