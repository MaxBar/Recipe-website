import mongoose from 'mongoose';
import { RecipeSchema } from '../models/createRecipeModel';

const recipe = mongoose.model('Recipe', RecipeSchema);

export class AddNewRecipe {
    constructor() {
        console.log(RecipeSchema);
        //const recipe = mongoose.model('Recipe', RecipeSchema);
    }

    static newRecipe(req, res) {
        let newRecipe = new recipe(req.body);

        newRecipe.save((err, recipe) => {
            if(err) {
                res.send(err);
            }
            res.json(recipe);
        });
    };
}