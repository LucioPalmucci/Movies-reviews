import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: 'e64b602aba57474ef266dbb22be5f8db',
                        query: query,
                        language: 'en-US'
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError('Error fetching movies');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
            <br/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

//Each movie card found in the search results.
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
            <br/>
            <Link to={`/movie/${movie.id}`} className='bg-transparent border rounded px-2 inline-block mt-2' target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
    );
}