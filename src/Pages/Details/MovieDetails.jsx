import { faCheckToSlot, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: 'e64b602aba57474ef266dbb22be5f8db',
                        language: 'en-US'
                    }
                });
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div>No movie details found.</div>;
    }

    return (
        <div className='m-4 px-44 flex font-Rubik justify-evenly mt-10 space-x-10 items-center dark:bg-neutral-900'>
            <div>
                <h1 className="text-2xl font-bold mb-2 py-2">{movie.title}</h1>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className='p-10 rounded bg-gray-200 m-10 align-center flex flex-col h-full dark:bg-neutral-700'>
                <p><b>Plot:</b> {movie.overview}</p>
                <p><b>Release Date:</b> {movie.release_date}</p>
                <p><b>Genres:</b> {movie.genres.map(company => company.name).join(', ')}</p>
                <p><b>Production:</b> {movie.production_companies.map(company => company.name).join(', ')}</p>
                <p><b>Budget:</b> {movie.budget}$ USD</p>
                <p><b>Revenue:</b> {movie.revenue}$ USD</p>
                <p><b>Runtime:</b> {movie.runtime} minutes</p>
                <p><FontAwesomeIcon icon={faStar} className='text-yellow-400' />{movie.vote_average.toFixed(1)}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCheckToSlot} color='rgb(0, 255, 0)' />{movie.vote_count}</p>
            </div>
        </div>
    );
}