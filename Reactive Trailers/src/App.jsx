import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import MovieCard from './components/MovieCard.jsx';

function App() {
    const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
    const MOVIE_API = 'https://api.themoviedb.org/3';
    const SEARCH_API = '/search/movie?query=';
    const DISCOVER_API = '/discover/movie';

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

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
                authorization: 'Bearer ' + API_KEY,
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

    async function getMovieById(id) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: 'Bearer ' + API_KEY,
            },
        };
        const data = await fetch(`${MOVIE_API}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`, options);
        const movie = await data.json();

        return movie;
    }

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
                        <MovieCard movie={movie} getMovieById={getMovieById} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default App;
