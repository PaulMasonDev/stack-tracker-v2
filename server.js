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
  console.log('FROM BACKEND:', req.params.code);
  const code = req.params.code
  console.log('GENERATE RUNNING', code);
  await axios
    // EVENTUALLY CREATE PARAMETERS THAT CAN BE SELECTED TO MODIFY MAXIMUM NUMBER
    .get(`https://indreed.herokuapp.com/api/jobs?q=Software%20Developer&sort=date&max=20&l=${code}`)
    .then(async response => {
      location = response.data[0].location;
      for (job of response.data) {
        console.log(job.url);
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
            tech.url.push(job.url);
            console.log(tech.name, tech.count);
          }
        }  
      }
      data = {
        location: location, 
        code: code,
        techStack: techStack
      }
      return data;
    })
    .then((data) => {
      res.send(data)
      console.log('DATA SENT TO FRONTEND');
    } )
    .catch(err => console.log(err));
    for (tech of techStack) {
      tech.count = 0;
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