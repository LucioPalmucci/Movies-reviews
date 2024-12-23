import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Footer() {
    return (
        <div className="bg-neutral-800 text-white p-10 font-Lato flex justify-between mt-20">
            <p>2024 MovieReviews.</p>
            <p>
                <a href="https://luciopalmucci.github.io/Portfolio/" target="_blank" rel="noopener noreferrer" className='hover:text-gray-400 transition duration-300'>
                    Lucio Palmucci
                </a>
                <a href="https://www.linkedin.com/in/luciopalmucci/" target="_blank" rel="noopener noreferrer" className="ml-2">
                    <FontAwesomeIcon icon={faLinkedin} className='hover:opacity-75 transition duration-300' />
                </a>
                <a href="https://github.com/luciopalmucci" target="_blank" rel="noopener noreferrer" className="ml-2">
                    <FontAwesomeIcon icon={faGithub} className='hover:opacity-75 transition duration-300'/>
                </a>
            </p>
        </div>
    );
}