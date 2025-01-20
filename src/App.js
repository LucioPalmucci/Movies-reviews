import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';

function App() {
    //guardar entre pestañas el modo oscuro
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
      });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <NavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="content p-4 dark:bg-neutral-900 dark:text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;