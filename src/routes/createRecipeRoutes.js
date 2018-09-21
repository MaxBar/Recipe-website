import { AddNewRecipe } from '../controllers/createRecipeController';

module.exports = class createRecipeRoutes {
    constructor(app) {
        this.app = app;
        this.setGetRoutes();
        this.setPostRoutes();
        this.setPutRoutes();
        this.setDeleteRoutes();
    }

    setGetRoutes() {
        this.app.get('/create-recipe', (req, res, next) => {
            // midddleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        })
        // TODO get recipes
        // TODO search recipes
        // TODO get credentials for account page
    }

    setPostRoutes() {
        this.app.post('/create-recipe', (req, res) => AddNewRecipe.newRecipe(req, res));
        console.log("hej");
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