import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

function HeroModal({ movieId, title, overview, getMovieById }) {
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        async function fetchTrailer() {
            try {
                const response = await getMovieById(movieId);
                const trailer = response.videos.results.find((t) => t.type == 'Trailer');
                console.log(response.videos.results);
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            } catch (error) {
                console.error('Error fetching trailer:', error);
            }
        }

        fetchTrailer();
    }, [movieId]);

    return (
        <div className="hero-modal">
            <div className="hero-content">
                <YouTube
                    opts={{ height: '390', width: '640', playerVars: { autoplay: 1, controls: 0 } }}
                    videoId={trailerKey}
                    className="video"
                />
                <h2>{title}</h2>
                <p>{overview}</p>
            </div>
        </div>
    );
}

export default HeroModal;
