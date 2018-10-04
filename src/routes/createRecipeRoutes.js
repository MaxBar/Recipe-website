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
    }

    setPostRoutes() {
        this.app.post('/create-recipe', upload.single('file'), (req, res) => AddNewRecipe.newRecipe(req, res));
    }

    setPutRoutes() {
        this.app.put('/create-recipe/:recipeId', (req, res) => {
            res.send('PUT request successful');
        })
    }

    setDeleteRoutes() {
        this.app.delete('/create-recipe/:recipeId', (req, res) => {
            res.send('DELETE request successful');
        })
    }
}