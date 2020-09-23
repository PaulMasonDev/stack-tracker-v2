const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const htmlToText = require('html-to-text');
const cors = require('cors');
const { response } = require('express');

app.use(express.json());
app.use(cors());
// const scraperapiClient = require('scraperapi-sdk')('2c16addec87232b6f98f8112b28160f8')

// q=Web%20Developer    THIS IS THE SEARCH TERM
// max=5 TELLS THE MAXIMUM AMOUNT OF JOBS TO LIST
// l=Lagos country=us USE TO INDENTIFY LOCATION, MAY ALSO USE A ZIP CODE
// sort=date SORT BY NEWEST

let testUrl;

const port = 5000;
let techStack = [
  { name: 'html',
    count: 0
  },
  { name: 'css',
    count: 0
  },
  { name: 'javascript',
    count: 0
  },
  { name: 'node',
    count: 0
  },
  { name: 'mongodb',
    count: 0
  },
  { name: 'sql',
    count: 0
  },
  { name: 'python',
    count: 0
  },
  { name: 'django',
    count: 0
  },
  { name: 'php',
    count: 0
  },
  { name: 'react',
    count: 0
  },
];

app.post('/ziptocity', (req, res) => {
  const code = req.body.code;
  let returnData;
  console.log('GENERATE RUNNING', code);
  const url = 
  `https://indreed.herokuapp.com/api/jobs?q=Software%20Developer&l=${code}`;
  returnData = axios.get(url)
    .then(response => 
      res.json(response.data)
    )
    .catch(err => console.log(err));
  console.log(returnData);
});
// COMBINE THESE TWO ROUTES LOOK INTO ASYNC WATERFALL
app.get('/:code', async (req, res) => {
  console.log('FROM BACKEND:', req.params.code);
  const code = req.params.code
  let data;
  await axios
    .get(`https://indreed.herokuapp.com/api/jobs?q=Software%20Developer&l=${code}`)
    .then(async response => {
      for (job of response.data) {
        const jobResponse = await axios.get(job.url);
        const $ = cheerio.load(jobResponse.data);
        const textData = await htmlToText.fromString($('body').html());
        // console.log(textData);
        for (tech of techStack) {
          if (textData.toLowerCase().includes(tech.name)) {
            tech.count++;
          }
        }
      }
      for (tech of techStack) {
        console.log(tech.name, tech.count);
      }
      return techStack;
    })
    // .then((data) => {
    //   console.log(data);
    //   return data;
    // })
    .then((data) => res.send(data))
    .catch(err => console.log(err));
  // console.log('DATA', data);
  
});

app.listen(port, (req, res) => {
  console.log(`Connected on port ${port}`);
});