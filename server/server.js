const express = require('express');
const fs = require('fs');
const path = require('path');

const React = require('react'); 
const ReactDOMServer = require('react-dom/server');

import App from '../fe/App'

const app = express();
const PORT = process.env.PORT || 3000;
app.use('^/$', (req, res, next) => {
  fs.readFile(path.resolve('./fe/public/index.html'), 'utf-8', (err, data) => {
      if (err) {
          console.log(err);
          return res.status(500).send("fucked!");
      }
      return res.send(data.replace('<div id="root"></div>',
      ` <div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`));
  })
})

//it's this line of code that i have to look through styled comps for nothin lol
app.use(express.static(path.resolve(__dirname, '../fe','public')))
// W for me for using this btw :O

app.listen(PORT, ()=>{
console.log(`It's worked dude, listening at http://localhost:${PORT}`);
})