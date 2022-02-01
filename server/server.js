const express = require('express');
const fs = require('fs');
const path = require('path');

const React = require('react'); 
const ReactDOMServer = require('react-dom/server');

import App from '../fe/App'

const app = express();
const PORT = 3000;

app.use('^/$', (req, res, next) => {
    fs.readFile(path.resolve('./fe/index.html'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("fucked!");
        }
        return res.send(data.replace('<div id="root"></div>',
        ` <div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`));
    })
})


app.listen(PORT, ()=>{
console.log(`It's worked dude, listening at ${PORT}`);
})