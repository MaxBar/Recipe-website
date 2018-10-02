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

    setGetRoutes() {
        this.app.get('/create-recipe', (req, res, next) => { res.render('create-recipe'); } )
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