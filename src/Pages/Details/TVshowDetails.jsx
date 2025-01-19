import { faCheckToSlot, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export default function TVShowDetails() {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                    params: {
                        api_key: 'e64b602aba57474ef266dbb22be5f8db',
                        language: 'en-US'
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
    }, [id]);

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
        <div className='m-4 px-44 flex font-Rubik justify-evenly mt-10 space-x-10 items-center'>
            <div>
                <h1 className="text-2xl font-bold mb-2 py-2">{show.name}</h1>
                <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
            </div>
            <div className='p-10 rounded bg-gray-200 m-10 align-center flex flex-col h-full'>
                <p><b>Plot:</b> {show.overview}</p>
                <p><b>First Air Date:</b> {show.first_air_date}</p>
                <p><b>Genres:</b> {show.genres.map(genre => genre.name).join(', ')}</p>
                <p><b>Production:</b> {show.production_companies.map(company => company.name).join(', ')}</p>
                <p><b>Seasons:</b> {show.number_of_seasons}&nbsp;&nbsp;&nbsp; <b>Episodes:</b> {show.number_of_episodes}</p>
                <p><b>Vote Count:</b> {show.vote_count}</p>
                <p><FontAwesomeIcon icon={faStar} className='text-yellow-400' />{show.vote_average.toFixed(1)}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCheckToSlot} color='rgb(0, 255, 0)' />{show.vote_count}</p>
            </div>
        </div>
    );
}