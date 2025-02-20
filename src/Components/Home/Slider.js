import { faCalendar, faCheckToSlot, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./MovieSliders.css";

const API_KEY = 'e64b602aba57474ef266dbb22be5f8db';

async function fetchTrailer(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}
export function useLoadTrailers(movieChunks) {
    const [trailers, setTrailers] = useState({});

    useEffect(() => {
        async function loadTrailers() {
            const newTrailers = {};
            for (const chunk of movieChunks) {
                for (const movie of chunk) {
                    const trailerUrl = await fetchTrailer(movie.id);
                    newTrailers[movie.id] = trailerUrl;
                }
            }
            setTrailers(newTrailers);
        }
        loadTrailers();
    }, [movieChunks]);

    return trailers;
}
export function Latest({ movieChunks , title }) {
    const trailers = useLoadTrailers(movieChunks);

    return (
        <div className="p-4 font-Rubik bg-gray-100 pt-2 mt-10 dark:bg-neutral-600 dark:text-white">
            <h1 className="text-2xl font-bold mb-2 ">{title}</h1>
            <Carousel className='w-full justify-center flex carousel'>
                {movieChunks.map((chunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-around" style={{ minHeight: '300px' }}>
                            {chunk.map((movie) => (
                                <div key={movie.id} className="p-2 relative" style={{ width: '200px' }}>
                                    <a href={trailers[movie.id] || `https://www.youtube.com/results?search_query=${movie.title} trailer`} target="_blank" rel="noopener noreferrer">
                                        <img
                                            className="d-block hover:opacity-75 transition ease-in-out duration-150"
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                            style={{ width: '250px', height: '300px' }}
                                        />
                                        <FontAwesomeIcon icon={faPlay} className='absolute inset-0 m-auto text-white text-2xl opacity-75 border-3 p-2 px-2.5 rounded-full bottom-60 end-32' />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
export function Upcoming({ movieChunks , title}) {
    const trailers = useLoadTrailers(movieChunks);

    return (
        <div className="p-4 font-Rubik bg-gray-100 pt-2 mt-20 dark:bg-neutral-600 dark:text-white">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <Carousel className='w-full justify-center flex carousel'>
                {movieChunks.map((chunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-around" style={{ minHeight: '300px' }}>
                            {chunk.map((movie) => (
                                <div key={movie.id} className="p-2 relative" style={{ width: '200px' }}>
                                    <a href={trailers[movie.id] ||`https://www.youtube.com/results?search_query=${movie.title} trailer`} target="_blank" rel="noopener noreferrer">
                                        <img
                                            className="d-block hover:opacity-75 transition ease-in-out duration-150 mb-1"
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                            style={{ width: '250px', height: '300px' }}
                                        />
                                    </a>
                                    <FontAwesomeIcon icon={faCalendar} className='text-emerald-300'/> {movie.release_date}
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export function Best({ movieChunks , title}) {
    return (
        <div className="p-4 font-Rubik bg-yellow-100 pt-2 mt-20 yellow-glow dark:text-neutral-800">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <Carousel className='w-full justify-center flex carousel'>
                {movieChunks.map((chunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-around" style={{ minHeight: '300px' }}>
                            {chunk.map((movie) => (
                                <div key={movie.id} className="p-2 relative" style={{ width: '200px' }}>
                                    <Link to={`/movie/${movie.id}`} target='_blank' rel='noopener noreferrer'>
                                        <img
                                            className="d-block hover:opacity-75 transition ease-in-out duration-150 mb-1"
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                            style={{ width: '250px', height: '300px' }}
                                        />
                                    </Link>
                                    <div className='justify-between flex left-0'>
                                        <div>
                                            <FontAwesomeIcon icon={faStar} color='rgb(222, 218, 0)' />{movie.vote_average.toFixed(1)}
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faCheckToSlot} color='rgb(0, 255, 0)' />{movie.vote_count}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}


