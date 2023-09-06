import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

function HeroModal({ movieId, title, overview, getMovieById }) {
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        async function fetchTrailer() {
            try {
                const response = await getMovieById(movieId);
                const trailer = response.videos.results.find((t) => t.name === 'Official Trailer');
                console.log(response.videos.results.find((t) => t.name == 'Official Trailer').key);

                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            } catch (error) {
                console.error('Error fetching trailer:', error);
            }
        }

        fetchTrailer();
    }, [movieId]);

    console.log(trailerKey);
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
