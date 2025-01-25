import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import translations from '../../Components/translations';
const API_KEY = 'e64b602aba57474ef266dbb22be5f8db';

export default function PersonDetails() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [error, setError] = useState(null);
    const [credits, setCredits] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        const appElement = document.querySelector('.App');
        const observer = new MutationObserver(() => {
            const newLanguage = appElement.classList.contains('es') ? 'es' : 'en';
            setLanguage(newLanguage);
        });

        observer.observe(appElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            observer.disconnect();
        };
    }, []);

    const t = translations[language];

    useEffect(() => {
        const fetchPersonDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/person/${id}`, {
                    params: {
                        api_key: API_KEY,
                        language: language === 'es' ? 'es-MX' : 'en-US',
                    }
                });
                setPerson(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError('Error fetching movie details');
            }
        };

        const fetchPersonCredits = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                    }
                });
                setCredits(response.data.cast);
            } catch (error) {
                console.error('Error fetching person credits:', error);
            }
        };

        fetchPersonCredits();
        fetchPersonDetails();
    }, [id, language]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!person) {
        return <div>No Person details found.</div>;
    }


    const biogaphyText = isExpanded ? person.biography : `${person.biography.substring(0, 200)}...`;

    //Las 5 peliculas mas populares que participó
    const popularMovies = credits
        .filter(movie => movie.popularity > 5) // Ajusta el umbral de popularidad según sea necesario
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 5); // Limita a las 5 películas más populares
    return (
        <div className='m-4 px-44 flex font-Rubik justify-evenly mt-10 space-x-10 items-center'>
            <div>
                <h1 className="text-3xl font-bold mb-2 py-2">{person.name}</h1>
                <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} />
            </div>
            <div className='p-10 rounded bg-gray-200 m-10 align-center flex flex-col relative h-full dark:bg-neutral-700'>
                <p className='mb-0'><b>{t.personDetails.Biography}:</b> {biogaphyText}</p>
                {person.biography.length > 200 && (
                    <button onClick={toggleExpand} className="text-blue-500 text-sm text-start mb-2">
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
                <p><b>{t.personDetails.Birthday}:</b> {person.birthday}</p>
                {person.deathday && <p><b>{t.personDetails.Deathday}:</b> {person.deathday}</p>}
                <p><b>{t.personDetails.KnownFor}:</b> {person.known_for_department}</p>
                <p className='text-xl'><b>{t.personDetails.FamousMovies}:</b></p>
                <ul className='flex pl-0'>
                    {popularMovies.map(movie => (
                        <li key={movie.id} className="mb-2 flex flex-col justify-start mt-2 ">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className=" h-auto inline-block mr-2" />
                            <span>{movie.title} <br /> ({movie.release_date})</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}