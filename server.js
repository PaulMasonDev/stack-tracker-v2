const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const htmlToText = require('html-to-text');
const cors = require('cors');

app.use(express.json());
app.use(cors());

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
  { name: 'angular',
    count: 0
  },
  { name: 'flask',
    count: 0
  },
  { name: 'ajax',
    count: 0
  },
  { name: 'agile',
    count: 0
  },
  { name: 'scrum',
    count: 0
  },
  { name: 'kanban',
    count: 0
  },
  

]

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
        const jobResponse = await axios.get(job.url);
        const $ = cheerio.load(jobResponse.data);
        const textData = await htmlToText.fromString($('body').html());
        for (tech of techStack) {
          if (textData.toLowerCase().includes(tech.name)) {
            tech.count++;
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
    .then((data) => res.send(data))
    .catch(err => console.log(err));
});

app.listen(port, (req, res) => {
  console.log(`Connected on port ${port}`);
});