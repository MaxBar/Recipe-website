import express from 'express';
import mongoose from 'mongoose';
import bodyParse from 'body-parser';
import createRecipeRoutes from './src/routes/createRecipeRoutes';
import findRecipeRoutes from './src/routes/findRecipesRoutes';
import dotenv from 'dotenv-extended';

dotenv.load();

const app = express();
const PORT = 3000;
//app.set('view engine', 'ejs');

// mongoose connection
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE);

// bodyparser setup
app.use(bodyParse.urlencoded({ extended: true}));
app.use(bodyParse.json());

new createRecipeRoutes(app);
new findRecipeRoutes(app);

//app.get('/', (req, res) => {
//    res.render('index', {
//        content: 'Hello express from <em>EJS</em>'
//    });
//})
app.use(express.static('public')); 

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});