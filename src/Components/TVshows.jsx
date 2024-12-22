import { faFire, faFrown, faMeh, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

const API_KEY = 'e64b602aba57474ef266dbb22be5f8db';
const API_URL = 'https://api.themoviedb.org/3/tv/airing_today';

export default function TVshows() {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        const fetchShows = async () => {
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
                const allShows = responses.flatMap(response => response.data.results);
                setShows(allShows.slice(0, 15));
            } catch (error) {
                console.error('Error fetching Shows:', error);
            }
        };

        fetchShows();
    }, []);


    const getSmileIcon = (vote_average) => {
        if (vote_average > 7) {
            return { icon: faSmile, colorRating: 'text-green-500' };
        } else if (vote_average >= 5) {
            return { icon: faMeh, colorRating: 'text-yellow-500' };
        } else {
            return { icon: faFrown, colorRating: 'text-red-500' };
        }
    };

    const getFireColor = (popularity) => {
        if (popularity > 2000) {
            return { colorPopularity: 'text-red-500' };
        } else if (popularity > 1500) {
            return { colorPopularity: 'text-orange-500' };
        } else {
            return { colorPopularity: 'text-yellow-500' };
        }
    }

    return (
        <div className='p-4 font-Lato mt-20'>
            <h1 className='text-2xl font-bold'>TV Shows</h1>
            <div className='flex justify-between'>
                <div className='text-start p-4 font-Lato rounded bg-gray-100 pt-2 mt-10 w-1/2'>
                    <h3 className='text-xl py-2'>Airing today</h3>
                    {shows.map((show) => {
                        const { icon, colorRating } = getSmileIcon(show.vote_average);
                        const { colorPopularity } = getFireColor(show.popularity);
                        return (
                            <div key={show.id}>
                                <div className="p-2">
                                    <a
                                        href={`https://www.themoviedb.org/tv/${show.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className='justify-between flex'>
                                            <p>{show.name}</p>
                                            <div className={`space-x-4`}>
                                                <span className={colorPopularity}><FontAwesomeIcon icon={faFire} /> {show.popularity.toFixed(0)}</span>
                                                <span className={colorRating}><FontAwesomeIcon icon={icon} /> {show.vote_average.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <hr />
                            </div>
                        );
                    })}
                </div>
                <div className='text-start p-4 font-Lato rounded bg-gray-100 pt-2 mt-10 w-1/2'>
                    <h3 className='text-xl py-2'>Top rated</h3>
                    {shows.map((show) => {
                        const { icon, colorRating } = getSmileIcon(show.vote_average);
                        const { colorPopularity } = getFireColor(show.popularity);
                        return (
                            <div key={show.id}>
                                <div className="p-2">
                                    <a
                                        href={`https://www.themoviedb.org/tv/${show.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className='justify-between flex'>
                                            <p>{show.name}</p>
                                            <div className={`space-x-4`}>
                                                <span className={colorPopularity}><FontAwesomeIcon icon={faFire} /> {show.popularity.toFixed(0)}</span>
                                                <span className={colorRating}><FontAwesomeIcon icon={icon} /> {show.vote_average.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <hr />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}