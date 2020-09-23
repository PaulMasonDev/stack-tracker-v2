import React, { useState } from 'react';
import axios from 'axios';


import './Homepage.scss';
import SearchWindow from '../../components/SearchWindow/SearchWindow';
import DisplayWindow from '../../components/DisplayWindow/DisplayWindow';

const Homepage = () => {
  const [cityName, setCityName] = useState('');
  const [techStack, setTechStack] = useState([]);

  const handleSearch = (code) => {
    generateCity(code);
  }

  const generateCity = (code) => {
    const data = {
      code: code
    }
    console.log(code);
    axios.get(`/${code}`)
      .then(res => {
        console.log(res);
        setTechStack(res.data);
      })
      .catch(err => console.log(err));
    axios.post(`http://localhost:5000/ziptocity`, data)
      .then(res => {
        console.log(res);
        const cityName = res.data[0].location;
        setCityName(cityName);
      })
      .catch(err => console.log(err));
  }
  
  return (
    <div className="Homepage">
      <SearchWindow
        handleSearch={handleSearch}
        cityName={cityName}
      />
      <DisplayWindow 
        techStack={techStack}
        cityName={cityName}
      />
    </div>
  )
}

export default Homepage;