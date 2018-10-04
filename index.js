import express from 'express';
import mongoose from 'mongoose';
import bodyParse from 'body-parser';
import createRecipeRoutes from './src/routes/createRecipeRoutes';
import findRecipeRoutes from './src/routes/findRecipesRoutes';
import dotenv from 'dotenv-extended';
import multer from 'multer';
import path from 'path';

dotenv.load();

const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');

// mongoose connection
mongoose.Promise = global.Promise;

export let dbase;
const targetPath = path.join(__dirname, "/public/images/");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export let upload = multer({storage});
console.log(upload.storage.getDestination);
// bodyparser setup
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false}));

new createRecipeRoutes(app);
new findRecipeRoutes(app);

app.use(express.static('public')); 

mongoose.connect('mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE, (err, db) => {
    dbase = db.db;
    if(err) {
        return console.log(err);
    }
    app.listen(PORT, () => {
        console.log(`Your server is running on port ${PORT}`);
    });
});