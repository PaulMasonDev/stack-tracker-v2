import React, { useState } from "react";
import "./SearchWindow.scss";

const SearchWindow = ({ handleSearch, cityName }) => {
  const [searchValue, setSearchValue] = useState("");
  const [country, setCountry] = useState("us");
  const [title, setTitle] = useState("Software Developer");
  const [limitResults, setLimitResults] = useState(false);
  const [radius, setRadius] = useState(25);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };
  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  // }

  const handleChecked = () => {
    limitResults ? setLimitResults(false) : setLimitResults(true);
  };

  const handleRadius = (e) => {
    setRadius(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const letters = /^[A-Za-z]+$/;
    if (
      (typeof Number(searchValue) === "number" && searchValue.length === 5) ||
      searchValue.match(letters)
    ) {
      handleSearch(searchValue, country, title, limitResults, radius);
    } else {
      alert("Please enter a valid 5 digit zip code");
    }
  };

  return (
    <div className="SearchWindow">
      <h1>STACK TRACKER</h1>
      <div>
        <h1>
          INDREED API IS CURRENTLY DOWN. LOOKING FOR ANOTHER SOLUTION. THANK YOU
          FOR YOUR PATIENCE.
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <input
            type="search"
            placeholder="Enter a zip code to search"
            onChange={handleSearchChange}
          /> */}
          <br />
          <label htmlFor="US">UNITED STATES</label>
          <input
            onChange={handleCountryChange}
            id="US"
            type="radio"
            name="country"
            value="us"
            defaultChecked
          />
          {/* <label for="CAN">CAN</label>
          <input onChange={handleCountryChange} id="CAN" type="radio" name="country" value="ca"/>
          <label for="EU">EU</label>
          <input onChange={handleCountryChange} id="CAN" type="radio" name="country" value="eu"/> */}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="num-results"
              defaultChecked={limitResults}
              onChange={handleChecked}
            />
            LIMIT RESULTS (Speed up search time)
          </label>
        </div>
        {/* <div>
          <label>
            <input 
              type="number" 
              min="0" 
              max="100"
              value={radius}
              onChange={handleRadius}
            />
            Job Search Radius (1-100 miles)
          </label>
        </div> */}
        {/* <div>
          <label htmlFor="jrdeveloper">Junior Developer</label>
          <input onChange={handleTitleChange} id="jrdeveloper" type="radio" name="title" value="Junior Developer" />
          <label htmlFor="softwaredeveloper">Software Developer</label>
          <input onChange={handleTitleChange} id="softwaredeveloper" type="radio" name="title" value="Software Developer" defaultChecked/>
          <label htmlFor="seniordeveloper">Senior Developer</label>
          <input onChange={handleTitleChange} id="seniordeveloper" type="radio" name="title" value="Senior Developer" />
        </div> */}
        {/* <button type="submit">SUBMIT</button> */}
      </form>
      {/* <p>{cityName}</p> */}
      <footer>
        <p>LIKE WHAT YOU SEE?</p>
        <p>
          VISIT{" "}
          <a
            href="https://www.paulmasondev.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            WWW.PAULMASONDEV.COM
          </a>{" "}
          FOR MORE.
        </p>
        <p>COPYRIGHT &copy;2020 STACK TRACKER</p>
      </footer>
    </div>
  );
};

export default SearchWindow;
