import React from 'react';
import './SearchWindow.scss';
import axios from 'axios';


const SearchWindow = ({handleSearch, cityName}) => {
  const handleSearchChange = (e) => {
    if (e.target.value.length === 5) {
      handleSearch(e.target.value);
    }
  }

  return (
    <div className="SearchWindow">
      <h1>SEARCH WINDOW</h1>
      <input 
        type="search"
        placeholder="Enter a zip code to search"
        onChange={handleSearchChange} />
      <p>{cityName}</p>
    </div>
  )
}

export default SearchWindow;