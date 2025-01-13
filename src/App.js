import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App" style={{backgroundColor: '#f0f0f0'}}>
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;