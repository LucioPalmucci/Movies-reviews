import { faGlobe, faMagnifyingGlass, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ toggleDarkMode, isDarkMode }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchQuery}`);
    };

    return (
        <nav className={`flex justify-between font-Rubik p-4 text-white ${isDarkMode ? 'bg-gray-900' : 'bg-orange-500'}`}>
            <ul className="flex space-x-12 items-center mb-0">
                <li><Link to="/" className="no-decoration">Home</Link></li>
                <li><Link to="/reviews" className="no-decoration">Reviews</Link></li>
                <li><Link to="/about" className="no-decoration">About Movie-Reviews</Link></li>
                <li><Link to="/contact" className="no-decoration">Contact</Link></li>
            </ul>
            <form className="flex items-center" onSubmit={handleSearchSubmit}>
                <input
                    type="search"
                    id="menu"
                    placeholder="Search..."
                    className="rounded mr-2 text-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="p-1 rounded-lg">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
            <div className="flex items-center space-x-10">
                <div>
                    <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center rounded bg-gray-100 text-black p-2 dark:bg-neutral-700 dark:text-white">
                        <span className="dark:text-white">Language</span> <FontAwesomeIcon icon={faGlobe} className="ml-2 dark:text-white" />
                    </button>
                    {showDropdown && (
                        <ul className="absolute bg-white text-black shadow-lg right-20 dark:bg-neutral-700 dark:text-white">
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">English</li>
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Español</li>
                        </ul>
                    )}
                </div>
                <button className="items-center rounded-full bg-gray-100 text-black text-lg p-2 px-3 dark:bg-neutral-700" onClick={toggleDarkMode}>
                    <FontAwesomeIcon icon={faMoon} className="dark:text-white"/>
                </button>
            </div>
        </nav>
    );
}