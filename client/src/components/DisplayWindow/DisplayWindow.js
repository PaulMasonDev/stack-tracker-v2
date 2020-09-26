import React from 'react'

import InlineSVG from 'svg-inline-react';

const DisplayWindow = ({ techStack, cityName, zip, loading }) => {
  return (
    <div>
      <h1>DISPLAY WINDOW</h1>
      <p>{loading ? "SEARCHING THROUGH JOB POSTS..." : "WAITING FOR A SEARCH"}</p>
      <h3>{cityName ? `Searching in ${cityName} ${zip} found the following results:`: ``}</h3>
      {
        techStack.map(tech => {
          return <p key={tech.name}><InlineSVG src={tech.svg} /> showed up&nbsp;  
           {tech.count} 
          {
            tech.count === 1 ? " time" : " times"
          }
          </p>
        })
      }
    </div>
  )
}

export default DisplayWindow;