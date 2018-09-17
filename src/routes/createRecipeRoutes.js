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
        }, (req, res, next) => {
            res.send('GET request successful');
        })
    }

    setPostRoutes() {
        this.app.post('/create-recipe', (req, res) => AddNewRecipe.newRecipe(req, res));
    }

    setPutRoutes() {
        this.app.put('/create-recipe/:recipeId', (rea, res) => {
            res.send('PUT request successful');
        })
    }

    setDeleteRoutes() {
        this.app.delete('/create-recipe/:recipeId', (rea, res) => {
            res.send('DELETE request successful');
        })
    }
}