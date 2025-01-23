import { faFrown, faMeh, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import translations from '../Components/translations';

const API_KEY = 'e64b602aba57474ef266dbb22be5f8db';

function SearchMovieReviews() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [reviews, setReviews] = useState([]);
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        const appElement = document.querySelector('.App');
        const observer = new MutationObserver(() => {
            const newLanguage = appElement.classList.contains('es') ? 'es' : 'en';
            setLanguage(newLanguage);
        });

        observer.observe(appElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                //Search for the movie
                const searchResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: API_KEY,
                        query: query,
                        language: language === 'es' ? 'es-MX' : 'en-US',
                    }
                });

                if (searchResponse.data.results.length === 0) {
                    setError('No movies found');
                    return;
                }

                //the movie ID
                const movieId = searchResponse.data.results[0].id;

                const movieDetailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    params: {
                        api_key: API_KEY,
                        language: language === 'es' ? 'es-MX' : 'en-US',
                    }
                });

                setMovie(movieDetailsResponse.data);

                //Fetch reviews for the movie
                const reviewsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
                    params: {
                        api_key: API_KEY,
                        language: language === 'es' ? 'es-MX' : 'en-US',
                    }
                });

                setReviews(reviewsResponse.data.results);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Error fetching reviews');
            }
        };

        if (query) {
            fetchReviews();
        }
    }, [query, language]);

    if (error) {
        return <div>{error}</div>;
    }

    const t = translations[language];

    return (
        <div className='font-Rubik p-4 flex justify-center flex-col items-center'>
            <h1 className="text-2xl font-bold">{t.results} {query}</h1>
            {movie && (
                <div className="mb-4">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-64 h-auto rounded" />
                </div>
            )}
            <div className="flex flex-col gap-4">
                {reviews.map(review => (
                    <div>
                        <hr />
                        <ReviewCard key={review.id} review={review} language={language} />
                    </div>

                ))}
            </div>
        </div>
    );
}

function ReviewCard({ review, language }) {
    const t = translations[language];

    const getSmileIcon = (vote_average) => {
        if (vote_average > 7) {
            return { icon: faSmile, colorRating: 'text-green-500' };
        } else if (vote_average >= 5) {
            return { icon: faMeh, colorRating: 'text-yellow-500' };
        } else {
            return { icon: faFrown, colorRating: 'text-red-500' };
        }
    };
    const { icon, colorRating } = getSmileIcon(review.author_details.rating);

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const overviewText = isExpanded ? review.content : `${review.content.substring(0, 400)}...`;

    return (
        <div className="dark:text-white p-4 rounded w-full font-Rubik">
            <div className='flex items-center mb-4'>
                <div className=" items-center mb-4">
                    <div className="flex mb-4">
                        {(review.author_details.avatar_path) ? <img src={`https://www.themoviedb.org/t/p/w500${review.author_details.avatar_path}`} className="w-16 h-16 rounded-full mr-4" /> : null}
                        <div>
                            <h2 className="text-lg font-bold">{review.author}</h2>
                            <p className="text-sm">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p className="text-sm mb-0">{overviewText}</p>
                    {review.content.length > 200 && (
                        <button onClick={toggleExpand} className="text-blue-500 text-sm">
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                    <br />
                    {(review.author_details.rating) == null ?
                        <span className='text-gray-700'>{t.notRated}</span> :
                        <span className={colorRating}><FontAwesomeIcon icon={icon} /> {review.author_details.rating}/10</span>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchMovieReviews;