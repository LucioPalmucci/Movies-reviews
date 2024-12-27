import { faFacebook, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Contact () {
    return (
        <div className="flex justify-evenly mt-16 bg-gray-100 rounded py-10 px-4">
            <div className="social-media">
                <h4>Contact Us</h4>
                <div className="space-x-2">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size={30} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size={30} />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTiktok} size={30} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size={30} />
                    </a>
                </div>
            </div>
            <div className="policies">
                <h4>Policies</h4>
                <a href="/policies" target="_blank" rel="noopener noreferrer">View our policies</a>
            </div>
            <div className="licenses">
                <h4>Licenses</h4>
                <a href="/licenses" target="_blank" rel="noopener noreferrer">View our licenses</a>
            </div>
            <div className="customer-service">
                <h4>Customer Service</h4>
                <p>If you have any questions, please contact us at <a href="">support@MovieReviews.com</a></p>
            </div>
        </div>
    );
};

