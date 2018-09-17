import express from 'express';
import mongoose from 'mongoose';
import bodyParse from 'body-parser';
import routes from './src/routes/createRecipeRoutes';


const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://MaxBar:m19b82tm@ds259742.mlab.com:59742/recipe-web');

// bodyparser setup
app.use(bodyParse.urlencoded({ extended: true}));
app.use(bodyParse.json());

new routes(app);

app.get('/', (req, res) => {
    res.send(`Node and express server i running on port ${PORT}`);
})

app.listen(PORT, () => {
    console.log(`Yout server is running on port ${PORT}`);
});

// const express = require('express');
// const app = express();
// const path = require('path');

// let indexRoutes = require('./routes/index');
// new indexRoutes(app, path);
// let createRecipeRoute = require('./routes/create-recipe');
// new createRecipeRoute(app, path);

// app.use(express.static('public'));

// //app.use('/', indexRoute)(app);
// //app.use('/create-recipe', createRecipeRoute)(app);
// app.listen(3000, () => console.log('Listening on port 3000'));