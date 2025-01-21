import { useEffect, useState } from 'react';
import MovieSliders from "../Components/Home/MovieSliders.jsx";
import People from "../Components/Home/People.jsx";
import TVshows from "../Components/Home/TVshows.jsx";

export default function Home() {
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
        
    return (
        <div >
            <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/now_playing" } language={language}/>
            <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/upcoming"} language={language}/>
            <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/top_rated"} language={language}/>
            <TVshows language={language}/>
            <People language={language}/>
        </div>
    )
}