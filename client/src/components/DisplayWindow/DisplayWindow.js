import React from 'react'
import { ReactComponent as HtmlLogo } from './icons/html.svg';

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
      <HtmlLogo />
    </div>
  )
}

export default DisplayWindow;