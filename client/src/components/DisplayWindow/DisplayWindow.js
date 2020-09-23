import React from 'react'

const DisplayWindow = ({ techStack, cityName, zip }) => {
  return (
    <div>
      <h1>DISPLAY WINDOW</h1>
      <h3>Searching in {cityName} {zip} found the following results:</h3>
      {
        techStack.map(tech => {
          return <p key={tech.name}>{tech.name} showed up {tech.count} time(s)</p>
        })
      }
    </div>
  )
}

export default DisplayWindow;