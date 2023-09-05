import React from 'react';
import Search from './Search.jsx';

function Header() {
    return (
        <div className="main-header">
            <h1>Reactive Movie Trailers</h1>
            <Search />
        </div>
    );
}

export default Header;
