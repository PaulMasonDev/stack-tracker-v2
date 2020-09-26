import React from 'react'
import { ReactComponent as HtmlLogo } from './icons/html.svg';

const DisplayWindow = ({ techStack, cityName, zip }) => {
  const Html = <HtmlLogo />;
  return (
    <div>
      <h1>DISPLAY WINDOW</h1>
      <h3>Searching in {cityName} {zip} found the following results:</h3>
      {
        techStack.map((tech, i) => {
          // return <div>
          //           <p key={tech.name}>{tech.name} showed up {tech.count} time(s)</p>
          //        </div>
          return <p key={tech.name}>{Html}{tech.name} showed up {tech.count} time(s)</p>
        })
      }
      <HtmlLogo />
    </div>
  )
}

export default DisplayWindow;