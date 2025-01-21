import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import translations from '../translations.js';
import "./MovieSliders.css";

const API_KEY = 'e64b602aba57474ef266dbb22be5f8db';
const API_URL = 'https://api.themoviedb.org/3/person/popular';

export default function People({language}) {
    const [people, setPeople] = useState([]);
    

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                        page: 1
                    }
                });
                setPeople(response.data.results.slice(0, 18)); // Limit to 18 people
            } catch (error) {
                console.error('Error fetching popular people:', error);
            }
        };

        fetchPeople();
    }, []);

    // Group people into chunks of 6
    const chunkSize = 6;
    const peopleChunks = [];
    for (let i = 0; i < people.length; i += chunkSize) {
        peopleChunks.push(people.slice(i, i + chunkSize));
    }

    const t = translations[language];

    return (
        <div className='p-4 font-Rubik mt-16'>
            <h1 className='text-2xl font-bold'>{t.trendingC}</h1>
            <Carousel className='mt-8'>
                {peopleChunks.map((chunk, index) => (
                    <Carousel.Item key={index}>
                        <div className='flex justify-around'>
                            {chunk.map((person) => (
                                <div key={person.id} className='p-4 w-auto h-200'>
                                    <a
                                        href={`https://www.themoviedb.org/person/${person.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='no-decoration'
                                    >
                                        <img
                                            className='rounded-full mb-2 hover:opacity-75 transition ease-in-out duration-150 w-48 h-48 object-cover'
                                            src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                            alt={person.name}
                                        />
                                        <h2 className='text-xl font-bold person mb-0'>{person.name}</h2>
                                        <p className='text-gray-600 dark:text-white'>{t.popularity}: <FontAwesomeIcon icon={faArrowTrendUp} className='text-green-400'/>{person.popularity.toFixed(0)}</p>
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