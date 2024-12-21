
export default function TVshows() {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const responses = await Promise.all([
                    axios.get(API_URL, {
                        params: {
                            api_key: API_KEY,
                            language: 'en-US',
                            page: 1
                        }
                    }),
                    axios.get(API_URL, {
                        params: {
                            api_key: API_KEY,
                            language: 'en-US',
                            page: 2
                        }
                    })
                ]);
                const allShows = responses.flatMap(response => response.data.results);
                setShows(allShows.slice(0, 15));
            } catch (error) {
                console.error('Error fetching Shows:', error);
            }
        };

        fetchShows();
    }, []);

    return (

        <div>
            <h5>Airing today</h5>
            {movieChunks.map((show) => (
                <div key={show.id} className="p-2 justify-between border">
                    <p>{show.name}</p>
                </div>
            ))}
        </div>
    )
}