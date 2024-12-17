import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_KEY = 'e64b602aba57474ef266dbb22be5f8db';
const API_URL = 'https://api.themoviedb.org/3/movie/now_playing';

export default function Body() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                        page: 1
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Latest Films</h1>
            <div className="flex space-x-4 overflow-x-auto">
                {movies.map((movie) => (
                    <a key={movie.id} href={`https://www.youtube.com/results?search_query=${movie.title} trailer`} target="_blank" rel="noopener noreferrer">
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="w-40 h-60 object-cover rounded-lg shadow-lg hover:opacity-75 transition-opacity duration-300" />
                    </a>
                ))}
            </div>
        </div>
    );
}
