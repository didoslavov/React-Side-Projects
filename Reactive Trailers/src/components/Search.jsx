import React from 'react';

function Search() {
    return (
        <form className="search-form">
            <input type="text" placeholder="Search Movie" className="search-input" />
            <input type="submit" value="Search" className="search-button" />
        </form>
    );
}

export default Search;
