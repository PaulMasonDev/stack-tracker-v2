import React, { useState } from 'react';
import axios from 'axios';

import './Homepage.scss';
import SearchWindow from '../../components/SearchWindow/SearchWindow';
import DisplayWindow from '../../components/DisplayWindow/DisplayWindow';

const Homepage = () => {
  const [cityName, setCityName] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [zip, setZip] = useState([]);

  const handleSearch = (code) => {
    generateCity(code);
  }

  const generateCity = (code) => {
    console.log(code);
    axios.get(`/${code}`)
      .then(res => {
        console.log(res.data);
        setTechStack(res.data.techStack);
        setCityName(res.data.location);
        setZip(res.data.code);
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
        zip={zip}
      />
    </div>
  )
}

export default Homepage;