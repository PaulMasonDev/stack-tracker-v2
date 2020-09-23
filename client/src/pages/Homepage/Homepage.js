import React, { useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

import './Homepage.scss';
import SearchWindow from '../../components/SearchWindow/SearchWindow';
import DisplayWindow from '../../components/DisplayWindow/DisplayWindow';

const Homepage = () => {
  const [cityName, setCityName] = useState('');

  const handleSearch = (code) => {
    generateCity(code);
  }

  const generateCity = (code) => {
    const data = {
      code: code
    }
    console.log(code);
    // axios.get(`/${code}`)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    axios.post(`http://localhost:5000/ziptocity`, data)
      .then(res => {
        console.log(res);
        const cityName = res.data[0].location;
        setCityName(cityName);
      })
      .then(axios.get(`/${code}`).then(res=>console.log(res)).catch(err => console.log(err)))
      .catch(err => console.log(err));
  }
  // const generateCity = (code) => {
  //   const url = 
  //   `https://cors-anywhere.herokuapp.com/https://indreed.herokuapp.com/api/jobs?l=${code}&max=1`;
  //   axios.get(url)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => console.log(err));
  // }

  return (
    <div className="Homepage">
      <SearchWindow
        handleSearch={handleSearch}
        cityName={cityName}
        />
      <DisplayWindow />
    </div>
  )
}

export default Homepage;