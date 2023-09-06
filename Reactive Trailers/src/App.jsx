import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import MovieCard from './components/MovieCard.jsx';

function App() {
    const MOVIE_API = 'https://api.themoviedb.org/3';
    const SEARCH_API = '/search/movie?query=';
    const DISCOVER_API = '/discover/movie';

    async function getMovies(search) {
        if (search) {
            setSearch(search);
        } else {
            setSearch('');
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: 'Bearer ' + import.meta.env.VITE_MOVIE_API_KEY,
            },
        };

        try {
            const data = await fetch(MOVIE_API + (search ? SEARCH_API + search : DISCOVER_API), options);

            if (!data.ok) {
                throw new Error('Network response was not ok');
            }

            const movies = await data.json();
            return movies;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    }

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getMovies(search)
            .then((movies) => {
                setMovies(movies.results);
            })
            .catch((error) => {
                console.error('Error in useEffect:', error);
            });
    }, [search]);

    return (
        <>
            <Header searchMovie={getMovies} setSearch={setSearch} />
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
