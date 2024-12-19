import { faGlobe, faMagnifyingGlass, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className="bg-orange-500 flex justify-between text-white font-Lato p-4">
            <ul className="flex space-x-12 items-center">
                <li>Home</li>
                <li>Reviews</li>
                <li>About Movie-Reviews</li>
                <li>Contact</li>
            </ul>
            <form className="flex items-center">
                <input type="search" id="menu" placeholder="Search..." className="rounded mr-2 text-black" />
                <button type="submit" className="p-1 rounded-lg">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
            <div className="flex items-center space-x-10">
                <div>
                    <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center rounded bg-gray-100 text-black p-2">
                        Language <FontAwesomeIcon icon={faGlobe} className="ml-2" />
                    </button>
                    {showDropdown && (
                        <ul className="absolute bg-white text-black shadow-lg right-20">
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">English</li>
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Español</li>
                        </ul>
                    )}
                </div>
                <button className="items-center rounded bg-gray-100 text-black p-2">
                    <FontAwesomeIcon icon={faMoon} />
                </button>
            </div>
        </nav>
    )
}
