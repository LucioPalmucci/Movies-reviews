import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import "./Home/MovieSliders.css";

export default function Footer() {
    return (
        <div className="bg-neutral-800 text-white p-10 font-Rubik flex justify-between dark:bg-blue-900">
            <p className='mb-0'>2024 MovieReviews</p>
            <p className='mb-0'>
                <a href="https://luciopalmucci.github.io/Portfolio/" target="_blank" rel="noopener noreferrer" className='hover:text-gray-400 transition duration-300 no-decoration'>
                    Lucio Palmucci <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </a>
                <a href="https://www.linkedin.com/in/luciopalmucci/" target="_blank" rel="noopener noreferrer" className="ml-2 no-decoration">
                    <FontAwesomeIcon icon={faLinkedin} className='hover:opacity-75 transition duration-300' />
                </a>
                <a href="https://github.com/luciopalmucci" target="_blank" rel="noopener noreferrer" className="ml-2 no-decoration">
                    <FontAwesomeIcon icon={faGithub} className='hover:opacity-75 transition duration-300'/>
                </a>
            </p>
        </div>
    );
}