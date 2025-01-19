import { faFire, faFrown, faMedal, faMeh, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./MovieSliders.css";

const API_KEY = 'e64b602aba57474ef266dbb22be5f8db';
const API_URL1 = 'https://api.themoviedb.org/3/tv/airing_today';
const API_URL2 = 'https://api.themoviedb.org/3/tv/top_rated';


export default function TVshows() {
    const [airingTodayShows, setAiringTodayShows] = useState([]);
    const [topRatedShows, setTopRatedShows] = useState([]);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const [airingTodayResponse, topRatedResponse] = await Promise.all([
                    axios.get(API_URL1, {
                        params: {
                            api_key: API_KEY,
                            language: 'en-US',
                            page: 1
                        }
                    }),
                    axios.get(API_URL2, {
                        params: {
                            api_key: API_KEY,
                            language: 'en-US',
                            page: 1
                        }
                    }),
                ]);
                setAiringTodayShows(airingTodayResponse.data.results.slice(0, 15));
                setTopRatedShows(topRatedResponse.data.results.slice(0, 15));
            } catch (error) {
                console.error('Error fetching TV shows:', error);
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

    const getRankingIcon = (vote_average, index) =>{
        if(index <= 2){
            switch (index){
                case 0: return { icon: faMedal , colorRating: 'text-yellow-500 glow' };
                case 1: return { icon: faMedal , colorRating: 'text-gray-500' };
                case 2: return { icon: faMedal , colorRating: 'text-brown' };
                default:
            }
        } else{
            return getSmileIcon(vote_average);
        }
    }

    const getFireColor = (popularity) => {
        if (popularity > 2000) {
            return { colorPopularity: 'text-red-500' };
        } else if (popularity > 1500) {
            return { colorPopularity: 'text-orange-500' };
        } else {
            return { colorPopularity: 'text-yellow-400' };
        }
    }

    return (
        <div className='p-4 font-Rubik mt-20'>
            <h1 className='text-2xl font-bold'>TV Shows</h1>
            <div className='flex justify-between space-x-16'>
                <div className='text-start p-4 font-Lato rounded bg-gray-100 pt-2 mt-10 w-1/2'>
                    <h3 className='text-xl py-2 mb-2'>Airing today</h3>
                    {airingTodayShows.map((show) => {
                        const { icon, colorRating } = getSmileIcon(show.vote_average);
                        const { colorPopularity } = getFireColor(show.popularity);
                        return (
                            <div key={show.id}>
                                <div className="p-2 py-0">
                                    <Link
                                        to={`/tvshow/${show.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='no-decoration'
                                    >
                                        <div className='justify-between flex'>
                                            <p className='mb-0'>{show.name}</p>
                                            <div className={`space-x-4`}>
                                                <span className={colorPopularity}><FontAwesomeIcon icon={faFire} /> {show.popularity.toFixed(0)}</span>
                                                <span className={colorRating}><FontAwesomeIcon icon={icon} /> {show.vote_average.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <hr />
                            </div>
                        );
                    })}
                </div>
                <div className='text-start p-4 font-Lato rounded bg-gray-100 pt-2 mt-10 w-1/2'>
                    <h3 className='text-xl py-2 mb-2'>Top rated</h3>
                    {topRatedShows.map((show, index) => {
                        const { icon, colorRating } = getRankingIcon(show.vote_average, index);
                        const { colorPopularity } = getFireColor(show.popularity);
                        return (
                            <div key={show.id}>
                                <div className="p-2 py-0">
                                    <Link
                                        to={`/tvshow/${show.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='no-decoration'
                                    >
                                        <div className='justify-between flex'>
                                            <p className='mb-0'>{show.name}</p>
                                            <div className="space-x-4">
                                                <span className={colorPopularity}><FontAwesomeIcon icon={faFire} /> {show.popularity.toFixed(0)}</span>
                                                <span className={colorRating}><FontAwesomeIcon icon={icon} /> {show.vote_average.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </Link>
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