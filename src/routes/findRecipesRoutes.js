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
        this.app.get('/index', (req, res) => { res.render('index');})
        this.app.get('/recipes', (req, res) => FindRecipe.getRecipes(req, res));
        this.app.get('/recipes/:recipeId', (req, res) => FindRecipe.getSpecificRecipe(req, res));
        this.app.get('/search-recipes/:recipeSearch', (req, res) => FindRecipe.searchRecipes(req, res));
        // TODO get recipes
        // TODO search recipes
        // TODO get credentials for account page
    }

    setPostRoutes() {
        // TODO Login post
        // TODO Create account post
    }

    setPutRoutes() {
        //this.app.put('/recipes/:recipeId', (rea, res) => {
        //    res.send('PUT request successful');
            // TODO change credentials put
        //})
        this.app.put('/recipes/:recipeId', (req, res) => FindRecipe.updateRecipe(req, res));
    }

    setDeleteRoutes() {
        this.app.delete('/recipes/:recipeId', (req, res) => FindRecipe.deleteRecipe(req, res));
            // TODO delete self
    }
}
