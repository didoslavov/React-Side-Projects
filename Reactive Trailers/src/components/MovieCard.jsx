import React, { useState } from 'react';
import HeroModal from './HeroModal.jsx';

function MovieCard({ movie, getMovieById }) {
    const [heroModal, setHeroModal] = useState(false);

    const showMore = () => {
        setHeroModal(!heroModal);
    };

    return (
        <div className="movie-card" onClick={showMore}>
            <img
                src={`${
                    movie.poster_path == null
                        ? '../../public/no_image.png'
                        : 'https://image.tmdb.org/t/p/w300' + movie.poster_path
                }`}
                alt="movie-image"
            />
            <h2>{movie.title}</h2>
            {heroModal && (
                <HeroModal title={movie.title} overview={movie.overview} movieId={movie.id} getMovieById={getMovieById} />
            )}
        </div>
    );
}

export default MovieCard;
