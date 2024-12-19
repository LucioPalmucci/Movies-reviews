import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

const API_KEY = 'e64b602aba57474ef266dbb22be5f8db';
const API_URL = 'https://api.themoviedb.org/3/movie/now_playing';

export default function Body() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const responses = await Promise.all([
                    axios.get(API_URL, {
                        params: {
                            api_key: API_KEY,
                            language: 'en-US',
                            page: 1
                        }
                    }),
                    axios.get(API_URL, {
                        params: {
                            api_key: API_KEY,
                            language: 'en-US',
                            page: 2
                        }
                    })
                ]);
                const allMovies = responses.flatMap(response => response.data.results);
                setMovies(allMovies.slice(0, 24));
                console.log('Movies:', allMovies.slice(0, 24));
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const chunkSize = 8;
    const movieChunks = [];
    for (let i = 0; i < movies.length; i += chunkSize) {
        movieChunks.push(movies.slice(i, i + chunkSize));
    }

    return (
        <div className="p-4 font-Lato">
            <h1 className="text-2xl font-bold mb-4">Latest Movies</h1>
            <Carousel className='w-full justify-center flex'>
                {movieChunks.map((chunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-around" style={{ minHeight: '300px' }}>
                            {chunk.map((movie) => (
                                <div key={movie.id} className="p-2" style={{ width: '200px' }}>
                                    <a href={`https://www.youtube.com/results?search_query=${movie.title} trailer`} target="_blank" rel="noopener noreferrer">
                                        <img
                                            className="d-block hover:opacity-75 transition ease-in-out duration-150"
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                            style={{ width: '250px', height: '300px' }}
                                        />
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