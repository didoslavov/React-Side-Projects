import React from 'react';

function HeroModal({ title, overview, image }) {
    return (
        <div className="hero-modal">
            <div className="hero-content">
                <img src={'https://image.tmdb.org/t/p/w1280' + image} alt="hero-image" />
                <h2>{title}</h2>
                <p>{overview}</p>
            </div>
        </div>
    );
}

export default HeroModal;
