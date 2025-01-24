import { useEffect, useState } from 'react';
import Contact from '../Components/About/Contact.jsx';
import IntroAbout from '../Components/About/IntroAbout.jsx';
import SliderComments from '../Components/About/SliderComments.jsx';

export default function About() {
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
        <div>
            <IntroAbout language={language}/>
            <SliderComments language={language}/>
            <Contact language={language}/>
        </div>
    );
}