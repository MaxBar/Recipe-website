import { FindRecipe } from '../controllers/findRecipesController';

module.exports = class createRecipeRoutes {
    constructor(app) {
        this.app = app;
        this.setGetRoutes();
        this.setPostRoutes();
        this.setPutRoutes();
        this.setDeleteRoutes();
    }

    setGetRoutes() {
        this.app.get('/recipes', (req, res) => FindRecipe.getRecipes(req, res));
        this.app.get('/recipes/:recipeId', (req, res) => FindRecipe.getSpecificRecipe(req, res));
        this.app.get('/search-recipes/:recipeName', (req, res) => FindRecipe.searchRecipes(req, res));
        // TODO get recipes
        // TODO search recipes
        // TODO get credentials for account page
    }

    setPostRoutes() {
        // TODO Login post
        // TODO Create account post
    }

    setPutRoutes() {
        this.app.put('/recipes/:recipeId', (rea, res) => {
            res.send('PUT request successful');
            // TODO change credentials put
            // TODO change recipe put
        })
    }

    setDeleteRoutes() {
        this.app.delete('/recipes/:recipeId', (rea, res) => {
            res.send('DELETE request successful');
            // TODO delete self
            // TODO delete recipe
        })
    }
}
