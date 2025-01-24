import { faFrown, faMagnifyingGlass, faMeh, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import translations from '../translations.js';


const API_KEY = 'e64b602aba57474ef266dbb22be5f8db';

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function RandomReviews() {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
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
        const fetchReviews = async () => {
            try {
                const movieReviewsResponse = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
                    params: {
                        api_key: API_KEY,
                        language: language === 'es' ? 'es-MX' : 'en-US',
                        page: 1
                    }
                });

                const tvReviewsResponse = await axios.get('https://api.themoviedb.org/3/tv/on_the_air', {
                    params: {
                        api_key: API_KEY,
                        language: language === 'es' ? 'es-MX' : 'en-US',
                        page: 1
                    }
                });

                const movieReviews = await Promise.all(
                    movieReviewsResponse.data.results.map(async (movie) => {
                        const reviewsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/reviews`, {
                            params: {
                                api_key: API_KEY,
                                language: language === 'es' ? 'es-MX' : 'en-US'
                            }
                        });
                        return reviewsResponse.data.results.map(review => ({
                            ...review,
                            media: movie
                        }));
                    })
                );

                const tvReviews = await Promise.all(
                    tvReviewsResponse.data.results.map(async (tv) => {
                        const reviewsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${tv.id}/reviews`, {
                            params: {
                                api_key: API_KEY,
                                language: language === 'es' ? 'es-MX' : 'en-US'
                            }
                        });
                        return reviewsResponse.data.results.map(review => ({
                            ...review,
                            media: tv
                        }));
                    })
                );

                // Combine movie and TV reviews
                const allReviews = [...movieReviews.flat(), ...tvReviews.flat()];

                // Shuffle and select a few random reviews
                const shuffledReviews = allReviews.sort(() => 0.5 - Math.random());
                const numberOfReviews = getRandomNumber(5, 15); // Selecciona un número aleatorio de reseñas entre 5 y 15
                const selectedReviews = shuffledReviews.slice(0, numberOfReviews);

                setReviews(selectedReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Error fetching reviews');
            }
        };

        fetchReviews();
    }, [language]);

    if (error) {
        return <div>{error}</div>;
    }

    const t = translations[language];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/MovieRev?query=${searchQuery}`);
    }

    return (
        <div className='font-Rubik p-4'>
            <div className='bg-lime-500	rounded justify-center p-4 mb-6 w-fit shadow-lg dark:bg-neutral-700'>
                <p>{t.searchRevMovie}:</p>
                <form className="flex items-center" onSubmit={handleSearchSubmit}>
                    <input
                        type="search"
                        id="menu"
                        placeholder={t.search_placeholder}
                        className="rounded mr-2 text-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="p-1 rounded-lg">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
            </div>
            <h1>{t.random}</h1>
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
            <div>
                <h3 className="text-md font-bold">{review.media.title || review.media.name}</h3>
            </div>
            <div className='flex items-center mb-4'>
                <img src={`https://image.tmdb.org/t/p/w200${review.media.poster_path}`} alt={review.media.title || review.media.name} className="w-32 h-auto rounded mr-4" />
                <div className=" items-center mb-4">
                    {(review.author_details.avatar_path) ? <img src={`https://www.themoviedb.org/t/p/w500${review.author_details.avatar_path}`} className="w-16 h-16 rounded-full mr-4" alt='' /> : null}
                    <div>
                        <h2 className="text-lg font-bold">{review.author}</h2>
                        <p className="text-sm">{new Date(review.created_at).toLocaleDateString()}</p>
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