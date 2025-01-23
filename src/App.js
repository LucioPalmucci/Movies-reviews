import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage ? savedLanguage : 'en';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const changeLanguage = (lng) => {
        setLanguage(lng);
    };

    return (
        <div className={`App ${isDarkMode ? 'dark' : ''} ${language === 'es' ? 'es' : 'en'}`}>
            <NavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} changeLanguage={changeLanguage} language={language} />
            <main className="content p-4 dark:bg-neutral-900 dark:text-white">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;