import React, { useState } from 'react';
import axios from 'axios';

import './Homepage.scss';
import SearchWindow from '../../components/SearchWindow/SearchWindow';
import DisplayWindow from '../../components/DisplayWindow/DisplayWindow';

const Homepage = () => {
  const [cityName, setCityName] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [zip, setZip] = useState([]);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(25);

  const handleSearch = (code, country, title, limitResults, radius) => {
    console.log(code, country, title, limitResults, radius);
    setLoading(true);
    setCityName('');
    setDistance(radius);
    axios.get(`/${code}/${limitResults}/${radius}`)
      .then(res => {
        console.log(res.data);
        setTechStack(res.data.techStack);
        setCityName(res.data.location);
        setZip(res.data.code);
        setLoading(false);
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
        loading={loading}
        distance={distance}
      />
    </div>
  )
}

export default Homepage;