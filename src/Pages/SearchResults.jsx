import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import translations from '../Components/translations.js';

export default function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
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


    useEffect(() => {
        const fetchResults = async () => {
            try {
                const movieResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: "e64b602aba57474ef266dbb22be5f8db",
                        query: query,
                        language: language === 'es' ? 'es-MX' : 'en-US',
                    }
                });

                const tvResponse = await axios.get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        api_key: "e64b602aba57474ef266dbb22be5f8db",
                        query: query,
                        language: language === 'es' ? 'es-MX' : 'en-US',
                    }
                });

                setMovies(movieResponse.data.results);
                setTvShows(tvResponse.data.results);
            } catch (error) {
                console.error('Error fetching results:', error);
                setError('Error fetching results');
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query, language]);

    if (error) {
        return <div>{error}</div>;
    }

    const t = translations[language];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{t.results} "{query}"</h1>
            <br />
            <div>
                {movies.length !== 0 &&
                    <div className="mt-8">
                        <h3>{t.movies}:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {movies.map(movie => (
                                <MediaCard key={movie.id} media={movie} type={movie} />
                            ))}
                        </div>
                    </div>
                }
                {tvShows.length !== 0 &&
                    <div className="mt-8">
                        <h3>{t.shows}:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {tvShows.map(show => (
                                <MediaCard key={show.id} media={show} type={show} />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

function MediaCard({ media, type }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const overview = media.overview || 'No overview available';
    const overviewText = isExpanded ? overview : `${overview.substring(0, 200)}...`;
    const posterPath = media.poster_path ? `https://image.tmdb.org/t/p/w200${media.poster_path}` : '';
    const title = type === 'movie' ? media.title : media.name;
    const releaseDate = type === 'movie' ? media.release_date : media.first_air_date;
    const detailsLink = type === 'movie' ? `/movie/${media.id}` : `/tvshow/${media.id}`;

    return (
        <div className="bg-gray-200 p-4 rounded w-64 font-Rubik dark:bg-neutral-400 shadow">
            {posterPath && <img src={posterPath} alt={title} className="w-full h-auto mb-2 rounded" />}
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-sm">{releaseDate}</p>
            <p className="text-sm mb-0">{overviewText}</p>
            {overview.length > 200 && (
                <button onClick={toggleExpand} className="text-blue-500 text-sm">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
            <br />
            <Link to={detailsLink} className='bg-transparent border rounded px-2 inline-block mt-2' target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
    );
}
/*
//Each movie card found in the search results
function MovieCard({ movie }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const overviewText = isExpanded ? movie.overview : `${movie.overview.substring(0, 200)}...`;

    return (
        <div className="bg-gray-600 text-white p-4 rounded w-64 font-Rubik dark:bg-neutral-400 ">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="w-full h-auto mb-2 rounded" />
            <h2 className="text-lg font-bold dark:text-black">{movie.title}</h2>
            <p className="text-sm dark:text-black">{movie.release_date}</p>
            <p className="text-sm mb-0 dark:text-black">{overviewText}</p>
            {movie.overview.length > 200 && (
                <button onClick={toggleExpand} className="text-blue-500 text-sm">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
            <br />
            <Link to={`/movie/${movie.id}`} className='bg-transparent border rounded px-2 inline-block mt-2' target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
    );
}

//Each show card found in the search results
function ShowCard({ show }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const overviewText = isExpanded ? show.overview : `${show.overview.substring(0, 200)}...`;
    return (
        <div className="bg-gray-600 text-white p-4 rounded w-64 font-Rubik dark:bg-neutral-400 ">
            <img src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} alt={show.title} className="w-full h-auto mb-2 rounded" />
            <h2 className="text-lg font-bold dark:text-black">{show.title}</h2>
            <p className="text-sm dark:text-black">{show.release_date}</p>
            <p className="text-sm mb-0 dark:text-black">{overviewText}</p>
            {show.overview.length > 200 && (
                <button onClick={toggleExpand} className="text-blue-500 text-sm">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
            <br />
            <Link to={`/tvshow/${show.id}`} className='bg-transparent border rounded px-2 inline-block mt-2' target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
    );
}*/