import mongoose from 'mongoose';
import { RecipeSchema } from '../models/recipeModel';

const Recipe = mongoose.model('Recipe', RecipeSchema);
//Recipe.index({recipeName:"text", description:"text"});

export class AddNewRecipe {
    constructor() {
    }

    static newRecipe(req, res) {
        let newRecipe = new Recipe(req.body);

        newRecipe.save((err, recipe) => {
            if(err) {
                res.send(err);
            }
            res.json(recipe);
        });
    } 

    static getRecipes(req, res) {
        Recipe.find({}, (err, recipe) => {
            if(err) {
                res.send(err);
            }
            res.json(recipe);
        });
    }

    static getSpecificRecipe(req, res) {
        Recipe.findById(req.params.recipeId, (err, recipe) => {
            if(err) {
                res.send(err);
            }
            res.json(recipe);
        });
    }
}
