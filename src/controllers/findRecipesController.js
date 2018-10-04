import mongoose from 'mongoose';
import { RecipeSchema } from '../models/recipeModel';

const Recipe = mongoose.model('Recipe', RecipeSchema);

export class FindRecipe {
    constructor() {
    }

    static getRecipes(req, res) {
        Recipe.find({}, (err, recipe) => {
            if(err) {
                return res.send(err);
            }
            res.json(recipe);
        });
    }
 
    static getSpecificRecipe(req, res) {
        console.log(req.params.recipeId);
        Recipe.findById(req.params.recipeId, (err, recipe) => {
            if(err) {
                return res.send(err);
            }
            res.render('recipes/recipe', { recipe });
        });
    }

    static searchRecipes(req, res) {
        console.log("hej");
        console.log(req.body.search);
        let searchString = new RegExp(req.body.search, 'i');
        if(req.body.search.length > 1) {
            Recipe.find({
                $or: [ 
                { recipeName: { "$regex": searchString }},
                { description: { "$regex": searchString }}
            ]}, (err, recipe) => {
                    if(err) {
                        return res.send(err);
                    }
                    let category = [...new Set(recipe.flatMap( c => c.category)) ];
                    res.render('search-recipe', { recipe, category });
            });
        }
    }

    static updateRecipe(req, res) {
        Recipe.findOneAndUpdate({ _id: req.params.recipeId }, req.body, { new: true }, (err, recipe) => {
            if(err) {
                return res.send(err);
            }
            res.json(recipe);
            }
        );
    }

    static deleteRecipe(req, res) {
        Recipe.remove({ _id: req.params.recipeId }, (err, recipe) => {
            if(err) {
                return res.send(err);
            }
            res.json({ message: 'Successfully deleted recipe'});
        });
    }
}
