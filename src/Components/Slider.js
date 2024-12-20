import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import "./arrows.css";

function Latest() {
    return (
        <div className="p-4 font-Lato rounded bg-gray-100 pt-2 mt-2">
            <h1 className="text-2xl font-bold mb-1">Latest Movies</h1>
            <Carousel className='w-full justify-center flex carousel'>
                {movieChunks.map((chunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-around" style={{ minHeight: '300px' }}>
                            {chunk.map((movie) => (
                                <div key={movie.id} className="p-2 relative" style={{ width: '200px' }}>
                                    <a href={`https://www.youtube.com/results?search_query=${movie.title} trailer`} target="_blank" rel="noopener noreferrer">
                                        <img
                                            className="d-block hover:opacity-75 transition ease-in-out duration-150"
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                            style={{ width: '250px', height: '300px' }}
                                        />
                                        <FontAwesomeIcon icon={faPlay} className='absolute inset-0 m-auto text-white text-2xl opacity-75 border-3 p-2 px-2.5 rounded-full bottom-60 end-32' />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
function Best() {
    return (
        <div className="p-4 font-Lato rounded bg-gray-100 pt-2 mt-2">
            <h1 className="text-2xl font-bold mb-1">Top Movies</h1>
            <Carousel className='w-full justify-center flex carousel'>
                {movieChunks.map((chunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-around" style={{ minHeight: '300px' }}>
                            {chunk.map((movie) => (
                                <div key={movie.id} className="p-2 relative" style={{ width: '200px' }}>
                                    <a href={`https://www.youtube.com/results?search_query=${movie.title} trailer`} target="_blank" rel="noopener noreferrer">
                                        <img
                                            className="d-block hover:opacity-75 transition ease-in-out duration-150"
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                            style={{ width: '250px', height: '300px' }}
                                        />
                                        <FontAwesomeIcon icon={faPlay} className='absolute inset-0 m-auto text-white text-2xl opacity-75 border-3 p-2 px-2.5 rounded-full bottom-60 end-32' />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
