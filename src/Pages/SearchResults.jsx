import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
            
        </div>
    );
}