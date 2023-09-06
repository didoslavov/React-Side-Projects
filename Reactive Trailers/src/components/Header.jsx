import React from 'react';
import Search from './Search.jsx';

function Header({ searchMovie }) {
    return (
        <div className="main-header">
            <h1>Reactive Movie Trailers</h1>
            <Search searchMovie={searchMovie} />
        </div>
    );
}

export default Header;
