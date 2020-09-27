
import React, { useState } from 'react';
import './SearchWindow.scss';


const SearchWindow = ({handleSearch, cityName}) => {
  const [searchValue, setSearchValue] = useState('');
  const [country, setCountry] = useState('us');
  const [title, setTitle] = useState('Software Developer')
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  }
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchValue, country, title);
  }
  return (
    <div className="SearchWindow">
      <h1>STACK TRACKER</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="search"
            placeholder="Enter a city or zip code to search"
            onChange={handleSearchChange} />
          <br />
          <label for="US">United States</label>
          <input onChange={handleCountryChange} id="US" type="radio" name="country" value="us" defaultChecked/>
          {/* <label for="CAN">CAN</label>
          <input onChange={handleCountryChange} id="CAN" type="radio" name="country" value="ca"/>
          <label for="EU">EU</label>
          <input onChange={handleCountryChange} id="CAN" type="radio" name="country" value="eu"/> */}
        </div>
        <div>
          <label for="jrdeveloper">Junior Developer</label>
          <input onChange={handleTitleChange} id="jrdeveloper" type="radio" name="title" value="Junior Developer" />
          <label for="softwaredeveloper">Software Developer</label>
          <input onChange={handleTitleChange} id="softwaredeveloper" type="radio" name="title" value="Software Developer" defaultChecked/>
          <label for="seniordeveloper">Senior Developer</label>
          <input onChange={handleTitleChange} id="seniordeveloper" type="radio" name="title" value="Senior Developer" />
        </div>
        <button type="submit">SUBMIT</button>
      </form>
      <p>{cityName}</p>
      <footer>
        <p>Like what you see? Visit <a href="https://www.paulmasondev.com" target="_blank">www.paulmasondev.com</a> to get in touch with me.</p>
        <p>Copyright &copy;2020 Stack Tracker</p>
      </footer>
    </div>
  )
}

export default SearchWindow;