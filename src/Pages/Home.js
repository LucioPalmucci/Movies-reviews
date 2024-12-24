import MovieSliders from "../Components/MovieSliders"
import People from "../Components/People"
import TVshows from "../Components/TVshows"

export default function Home() {
    return (
        <div>
            <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/now_playing"} />
            <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/upcoming"} />
            <MovieSliders API_URL={"https://api.themoviedb.org/3/movie/top_rated"} />
            <TVshows />
            <People />
        </div>
    )
}