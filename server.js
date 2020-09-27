const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const htmlToText = require('html-to-text');
const cors = require('cors');
const path = require('path');
const enforce = require('express-sslify');

const DATA = require('./DATA');

app.use(express.json());
app.use(cors());

// q=Web%20Developer    THIS IS THE SEARCH TERM
// max=5 TELLS THE MAXIMUM AMOUNT OF JOBS TO LIST
// l=Lagos country=us USE TO INDENTIFY LOCATION, MAY ALSO USE A ZIP CODE
// sort=date SORT BY NEWEST

const port = 5000;
const environment = process.env.NODE_ENV || 'dev';

let techStack = DATA;

let location;
let data;

app.get('/:code', async (req, res) => {
  const code = req.params.code;
  //THERE SEEMS TO BE A BUG WHEN TRYING TO USE EITHER TITLE OR COUNTRY
  // const country = req.params.country;
  // const title = req.params.title;
  // console.log('GENERATE RUNNING', code, country, title);
  await axios
    // EVENTUALLY CREATE PARAMETERS THAT CAN BE SELECTED TO MODIFY MAXIMUM NUMBER
    .get(`https://indreed.herokuapp.com/api/jobs?q=Software%20Developer&sort=date&max=20&l=${code}`)
    .then(async response => {
      if(response.data){
        location = response.data[0].location;
        for (job of response.data) {
          console.log(job);
          const jobResponse = await axios.get(job.url).catch(err => console.log(err));
          let $;
          let textData;
          try {
            $ = cheerio.load(jobResponse.data);
            if($){
              try {
                textData = htmlToText.fromString($('body').html());
              } catch (err) {
                console.log(err);
              }
            }  
          } catch (err) {
            console.log(err);
          }
          
          console.log('PARSING...');
          for (let tech of techStack) {
            if (textData && textData.toLowerCase().includes(tech.name)) {
              tech.count++;
              const info = {
                url: job.url,
                company: job.company,
                title: job.title
              }
              tech.info.push(info);
              console.log(tech.name, tech.count);
            }
          }  
        }
        data = {
          location: location, 
          code: code,
          techStack: techStack
        }
        techStack.sort((a, b) => (b.count - a.count))
        return data;
      }
      
    })
    .then((data) => {
      res.send(data)
      console.log('DATA SENT TO FRONTEND');
    } )
    .catch(err => console.log(err));
    for (tech of techStack) {
      tech.count = 0;
      tech.info = [];
    }
});

// Redirect to React in non Dev environment
if (environment !== 'dev') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join("client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || port, (req, res) => {
  console.log(`Connected on port ${port}`);
});