import React, { useState } from 'react';

function Search({ searchMovie }) {
    const [query, setQuery] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        searchMovie(query);
    };
    return (
        <form className="search-form" onSubmit={submitHandler}>
            <input type="text" placeholder="Search Movie" className="search-input" onChange={(e) => setQuery(e.target.value)} />
            <input type="submit" value="Search" className="search-button" />
        </form>
    );
}

export default Search;
