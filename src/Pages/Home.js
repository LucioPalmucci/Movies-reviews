import MovieSliders from "../Components/Home/MovieSliders.jsx"
import People from "../Components/Home/People.jsx"
import TVshows from "../Components/Home/TVshows.jsx"

export default function Home() {
    return (
        <div >
            <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/now_playing"} />
            <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/upcoming"} />
            <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/top_rated"} />
            <TVshows />
            <People />
        </div>
    )
}