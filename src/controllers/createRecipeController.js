import mongoose from 'mongoose';
import { RecipeSchema } from '../models/recipeModel';

const Recipe = mongoose.model('Recipe', RecipeSchema);
export class AddNewRecipe {
    constructor() {
    }

    static newRecipe(req, res) {
        console.log(req.body);
        //let newRecipe = new Recipe(req.body);
        let newRecipe = new Recipe(
            {recipeName: req.body.recipeName},
            {image: undefined},
            {$push: {
                ingredients: [
                {amount: req.body.amount},
                {unit: req.body.unit},
                {ingredient: req.body.ingredient}]}},
            {desciption: req.body.desciption},
            {category: req.body.category},
            {author: 'Max'});
        console.log(newRecipe);

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
