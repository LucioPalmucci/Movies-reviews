import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import translations from "../../Components/translations";


export default function ReviewsMedia({ reviews }) {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    useEffect(() => {
        const appElement = document.querySelector('.App');
        const observer = new MutationObserver(() => {
            const newLanguage = appElement.classList.contains('es') ? 'es' : 'en';
            setLanguage(newLanguage);
        });
    
        //Cuando la clase cambia, se ejecuta el observer
        observer.observe(appElement, { attributes: true, attributeFilter: ['class'] });
    
        return () => {
            observer.disconnect();
        };
    }, []);
    

    const t = translations[language];

    if (reviews.length === 0) {
        return <h4>{t.noReviews}</h4>;
    } else {
        return (
            <div className="font-Rubik p-4">
                <h4>{t.reviews}:</h4>
                <div className="grid grid-cols-4 gap-4 grid-row-4">
                    {reviews.map(review => (
                        <div key={review.id}>
                            <ReviewCard review={review} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

}

function ReviewCard({ review }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);
    const reviewText = isExpanded ? review.content : `${review.content.substring(0, 100)}...`;
    const avatarPath = review.author_details.avatar_path;
    const avatarUrl = avatarPath ? `https://www.themoviedb.org/t/p/w500${avatarPath}` : null;

    const getThumbIcon = (rating) => {
        if (rating > 7) {
            return { icon: faThumbsUp, colorRating: 'text-green-500' };
        } else if (rating >= 5) {
            return { icon: faThumbsDown, colorRating: 'text-yellow-500' };
        } else {
            return { icon: faThumbsDown, colorRating: 'text-red-500' };
        }
    };

    const { icon, colorRating } = review.author_details.rating ? getThumbIcon(review.author_details.rating) : {};

    return (
        <div className={` bg-gray-200 p-4 rounded font-Rubik dark:bg-neutral-600 overflow-hidden relative shadow ${isExpanded ? 'h-auto' : 'h-64'} `}>
            <div className="flex items-center mb-4">
                {avatarUrl && (
                    <img src={avatarUrl} alt={review.author} className="w-16 h-16 rounded-full mr-4" />
                )}
                <div>
                    <h2 className="text-lg font-bold">{review.author}</h2>
                    <p className="text-sm">{new Date(review.created_at).toLocaleDateString()}</p>
                </div>
            </div>
            <p className="text-sm mb-0">{reviewText}</p>
            {review.content.length > 100 && (
                <button onClick={toggleExpand} className="text-blue-500 text-sm absolute bottom-4 right-4">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
            {review.author_details.rating && (
                <div className="flex items-center mt-2">
                    <span className={`text-sm ${colorRating}`}><FontAwesomeIcon icon={icon} className={`mr-2`} />{review.author_details.rating}/10</span>
                </div>
            )}
        </div>
    );
}