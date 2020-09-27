import React from 'react';
import './DisplayWindow.scss';
import InlineSVG from 'svg-inline-react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner';

const DisplayWindow = ({ techStack, cityName, zip, loading }) => {
  return (
    <div className="DisplayWindow">
      <h1>RESULTS</h1>
      <p>{loading ? 
          <div>
            <Loader 
              type="Grid" 
              color="#0d7377" 
              height={200} 
              width={200} 
              timeout={0} 
            />
            <p>Please wait while I scrape the interwebs. This may take up to 30 seconds...</p>
          </div> : 
          <div>
            <p>WAITING FOR A SEARCH</p>
            <Loader
              type="Bars" 
              color="#0d7377" 
              height={100} 
              width={100} 
              timeout={0} 
            />
          </div>
          }</p>
      <h3>{cityName ? 
        <div>
          <p>Searching in {cityName} found the following results.</p>
          <p>Good luck on the job hunt. YOU GOT THIS!</p>
        </div>
        : ``}
      </h3>
      { cityName &&
        techStack.map(tech => {
          if(tech.count > 0){
            return <div className="tech-header" key={tech.name}><InlineSVG className="icon" src={tech.svg} />
              <h4>
                {tech.name.slice(0,1).toUpperCase() + tech.name.slice(1,)} showed up&nbsp;  
                {tech.count} 
                {
                  tech.count === 1 ? " time" : " times"
                }
              </h4>
              {tech.info && tech.info.map(info=> {
                return <div>
                  <a href={info.url} target="_blank">{info.title} at {info.company}</a><br/>
                </div>
              } )}
            </div> 
          }
        })
      }
    </div>
  )
}

export default DisplayWindow;