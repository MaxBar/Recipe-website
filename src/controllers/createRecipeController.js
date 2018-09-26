import mongoose from 'mongoose';
import { RecipeSchema } from '../models/recipeModel';
import { Nutrition } from '../utility/nutrition.class';

const Recipe = mongoose.model('Recipe', RecipeSchema);
export class AddNewRecipe {
    constructor() {
    }

    static newRecipe(req, res) {
        let newRecipe = new Recipe(req.body);
        let nutrition = new Nutrition();
        let nutritions = nutrition.calculateNutritions(req.body);
        console.log(nutritions);
        newRecipe.nutrients.kcal = nutritions.kcal;
        newRecipe.nutrients.protein = nutritions.protein;
        newRecipe.nutrients.kolhydrater = nutritions.kolhydrater
        console.log(newRecipe.nutrients);
        //newRecipe.
        //Nutrition.calculateNutritions(req.body);
        //console.log(Nutrition);
        //Nutrition.calculateNutritions(req.body);

        newRecipe.save((err, recipe) => {
            if(err) {
                return res.send(err);
            }
            res.redirect(`/recipes/${newRecipe._id}`);
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
