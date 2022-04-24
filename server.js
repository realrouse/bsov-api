const express = require('express');
const app = express();
const routes = require('./routes');

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json({ type: 'application/*+json' }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin": "*");
    res.header("Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//routes
app.use(routes);

// routes.js
require('./routes');

// listener for console
app.listen(port, () => console.log(`listening on port ${port}`));
