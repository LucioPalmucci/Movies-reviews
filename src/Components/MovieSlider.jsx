import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import "./arrows.css";
import "./Slider.js";

const API_KEY = 'e64b602aba57474ef266dbb22be5f8db';

export default function Latest({ API_URL, title }) {
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

    switch (API_URL) {
        case 'https://api.themoviedb.org/3/movie/now_playing':
            return(Latest());
        case 'https://api.themoviedb.org/3/movie/top_rated':
            return(Best());
        default:
            break;
    }
}