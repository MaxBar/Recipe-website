import { AddNewRecipe } from '../controllers/createRecipeController';
import { upload } from '../../index';

module.exports = class createRecipeRoutes {
    constructor(app) {
        this.app = app;
        this.setGetRoutes();
        this.setPostRoutes();
        this.setPutRoutes();
        this.setDeleteRoutes();
        
    }

    

    /*storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'public/images')
        },
        filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now())
        }
    });
    upload = multer({storage: storage});*/7


    setGetRoutes() {
        this.app.get('/create-recipe', (req, res, next) => {
            // midddleware
            res.render('create-recipe');
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        })
        // TODO get recipes
        // TODO search recipes
        // TODO get credentials for account page
    }

    setPostRoutes() {
        this.app.post('/create-recipe', upload.single('file'), (req, res) => AddNewRecipe.newRecipe(req, res));
        // TODO Login post
        // TODO Create account post
    }

    setPutRoutes() {
        this.app.put('/create-recipe/:recipeId', (req, res) => {
            res.send('PUT request successful');
            // TODO change credentials put
            // TODO change recipe put
        })
    }

    setDeleteRoutes() {
        this.app.delete('/create-recipe/:recipeId', (req, res) => {
            res.send('DELETE request successful');
            // TODO delete self
            // TODO delete recipe
        })
    }
}