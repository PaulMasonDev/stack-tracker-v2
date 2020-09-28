import React from 'react';
import './DisplayWindow.scss';
import InlineSVG from 'svg-inline-react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner';

const DisplayWindow = ({ techStack, cityName, distance, loading, noResults }) => {
  return (
    <div className="DisplayWindow">
      <h1>RESULTS</h1>
      <div>{loading ? 
          <div>
            <Loader 
              type="Oval" 
              color="#0d7377" 
              height={150} 
              width={150} 
              timeout={0} 
            />
            <p>Scraping the interwebs. This may take up to 30 seconds...</p>
          </div> : 
          <div>
            <Loader
              type="Bars" 
              color="#0d7377" 
              height={200} 
              width={200} 
              timeout={0} 
            />
            <p>WAITING FOR A SEARCH</p>
          </div>
          }</div>
      <h3>{cityName && noResults === false ? 
        <div>
          <p>Searched within {distance} {distance === 1 ? "mile" : "miles"} of {cityName} found the following results.</p>
          <p>Good luck on the job hunt. YOU GOT THIS!</p>
        </div>
        : ''}
      </h3>
      { cityName &&
        techStack.map(tech => {
          if(tech.count > 0){
            return <div className="tech-header" key={Math.random() * 9999}><InlineSVG className="icon" src={tech.svg} />
              <h4>
                {tech.name.slice(0,1).toUpperCase() + tech.name.slice(1,)} showed up&nbsp;  
                {tech.count} 
                {
                  tech.count === 1 ? " time" : " times"
                }
              </h4>
              {tech.info && tech.info.map(info=> {
                return <div key={info.url}>
                  <a href={info.url} target="_blank" rel="noopener noreferrer">{info.title} at {info.company}</a><br/>
                </div>
              } )}
            </div> 
          } else {
            return null;
          }
        })
      }
      {noResults ? <div>No results found. Try changing your search radius.</div> : null}
      <footer>
        <p>Copyright &copy;2020 Stack Tracker</p>
      </footer>
    </div>
  )
}

export default DisplayWindow;