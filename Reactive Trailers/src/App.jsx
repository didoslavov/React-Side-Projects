import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import MovieCard from './components/MovieCard.jsx';

function App() {
    const API_URL = 'https://api.themoviedb.org/3';

    async function getMovies() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: 'Bearer ' + import.meta.env.VITE_MOVIE_API_KEY,
            },
        };
        const data = await fetch(API_URL + '/discover/movie', options);
        const movies = await data.json();

        return movies;
    }

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies().then((movies) => {
            setMovies(movies.results);
        });
    }, []);

    return (
        <>
            <Header />
            <ul className="movie-list">
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <MovieCard movie={movie} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default App;
