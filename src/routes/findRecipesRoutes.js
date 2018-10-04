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
    }

    setPostRoutes() {
        this.app.post('/search-recipes', (req, res) => FindRecipe.searchRecipes(req, res));
    }

    setPutRoutes() {
        this.app.put('/recipes/:recipeId', (req, res) => FindRecipe.updateRecipe(req, res));
    }

    setDeleteRoutes() {
        this.app.delete('/recipes/:recipeId', (req, res) => FindRecipe.deleteRecipe(req, res));
    }
}
