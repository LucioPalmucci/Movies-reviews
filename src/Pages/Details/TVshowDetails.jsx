import { faCheckToSlot, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import translations from '../../Components/translations.js';
import ReviewsMedia from './ReviewsMedia.jsx';
export default function TVShowDetails() {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
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
        const fetchShowDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                    params: {
                        api_key: 'e64b602aba57474ef266dbb22be5f8db',
                        language: language === 'es' ? 'es-MX' : 'en-US',
                    }
                });
                setShow(response.data);
            } catch (error) {
                console.error('Error fetching show details:', error);
                setError('Error fetching show details');
            } finally {
                setLoading(false);
            }
        };

        fetchShowDetails();
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/reviews`, {
                    params: {
                        api_key: "e64b602aba57474ef266dbb22be5f8db",
                        language: language === 'es' ? 'es-MX' : 'en-US',
                    }
                });
                setReviews(response.data.results);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Error fetching reviews');
            }
        };

        fetchShowDetails();
        fetchReviews();
    }, [id, language]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!show) {
        return <div>No show details found.</div>;
    }

    return (
        <div>
            <div className='m-4 px-44 flex font-Rubik justify-evenly mt-10 space-x-10 items-center dark:bg-neutral-900'>
                <div>
                    <h1 className="text-2xl font-bold mb-2 py-2">{show.name}</h1>
                    <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
                </div>
                <div className='p-10 rounded bg-gray-200 m-10 align-center flex flex-col h-full dark:bg-neutral-700'>
                    <p><b>{t.showDetails.Plot}:</b> {show.overview}</p>
                    <p><b>{t.showDetails.FirstAirDate}:</b> {show.first_air_date}</p>
                    <p><b>{t.showDetails.Genres}:</b> {show.genres.map(genre => genre.name).join(', ')}</p>
                    <p><b>{t.showDetails.Production}:</b> {show.production_companies.map(company => company.name).join(', ')}</p>
                    <p><b>{t.showDetails.Seasons}:</b> {show.number_of_seasons}&nbsp;&nbsp;&nbsp; <b>{t.showDetails.Episodes}:</b> {show.number_of_episodes}</p>
                    <p><b>{t.showDetails.VoteCount}:</b> {show.vote_count}</p>
                    <p><FontAwesomeIcon icon={faStar} className='text-yellow-400' />{show.vote_average.toFixed(1)}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCheckToSlot} color='rgb(0, 255, 0)' />{show.vote_count}</p>
                </div>
            </div>
            <ReviewsMedia reviews={reviews} language={language} />
        </div>
    );
}