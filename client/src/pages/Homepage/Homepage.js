import React, { useState } from "react";
import axios from "axios";

import "./Homepage.scss";
import SearchWindow from "../../components/SearchWindow/SearchWindow";
import DisplayWindow from "../../components/DisplayWindow/DisplayWindow";

const Homepage = () => {
  const [cityName, setCityName] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [zip, setZip] = useState([]);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(25);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (code, limitResults) => {
    console.log(code, limitResults);
    setLoading(true);
    setCityName("");
    // setDistance(radius);
    axios
      .get(`/${code}/${limitResults}`)
      .then((res) => {
        console.log(res.data);
        if (res.data === "No Results") {
          setNoResults(true);
        } else {
          setNoResults(false);
          setTechStack(res.data.techStack);
          setCityName(res.data.location);
          setZip(res.data.code);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    // <div className="Homepage">
    //   <SearchWindow
    //     handleSearch={handleSearch}
    //     cityName={cityName}
    //   />
    //   <DisplayWindow
    //     techStack={techStack}
    //     cityName={cityName}
    //     loading={loading}
    //     distance={distance}
    //     noResults={noResults}
    //   />
    // </div>
    <div>
      <h1>
        STACK TRACKER: INDREED API IS CURRENTLY DOWN. LOOKING FOR ANOTHER
        SOLUTION. THANK YOU FOR YOUR PATIENCE. :)
      </h1>
    </div>
  );
};

export default Homepage;
