
import React, { useState } from 'react';
import './SearchWindow.scss';


const SearchWindow = ({handleSearch, cityName}) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchValue);
  }
  return (
    <div className="SearchWindow">
      <h1>SEARCH WINDOW</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="search"
          placeholder="Enter a zip code to search"
          onChange={handleSearchChange} />
        <button type="submit">SUBMIT</button>
      </form>
      <p>{cityName}</p>
    </div>
  )
}

export default SearchWindow;