const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')
const bodyParser = require('body-parser')

app.use(bodyParser.json());

const apiRoutes =  require('./routes/apiRoutes');

app.use('/api',apiRoutes)

mongoose.connect(process.env.DB_STRING, () => {
    console.log('Yay!!! Connected to MongoDB');
});

app.listen("8000")