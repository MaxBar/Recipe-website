import mongoose from 'mongoose';
import { RecipeSchema } from '../models/recipeModel';
import db from '../../index.js'

const Recipe = mongoose.model('Recipe', RecipeSchema);

export class FindRecipe {
    constructor() {
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
        console.log(req.params.recipeId);
        Recipe.findById(req.params.recipeId, (err, recipe) => {
            if(err) {
                res.send(err);
            }
            res.render('recipes/recipe', { recipe });
            //res.json(recipe);
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
                        res.send(err);
                    }
                    console.log(recipe);
                    let category = [...new Set(recipe.flatMap( c => c.category)) ];
                    for(let c of category) {
                        console.log(c);
                        for(let items of recipe) {
                            if(items.category.indexOf(c) > -1) {
                                //console.log(items);
                                console.log(items.recipeName);
                                //console.log(c);
                                //console.log(items.category);
                            };
                        }
                    }
                    res.render('search-recipe', { recipe, category });
                    //res.json(recipe);
            });
        }
    }

    static updateRecipe(req, res) {
        Recipe.findOneAndUpdate({ _id: req.params.recipeId }, req.body, { new: true }, (err, recipe) => {
            if(err) {
                res.send(err);
            }
            res.json(recipe);
            }
        );
    }

    static deleteRecipe(req, res) {
        Recipe.remove({ _id: req.params.recipeId }, (err, recipe) => {
            if(err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted recipe'});
        });
    }

    /* static searchRecipes(req, res) {
        console.log(req.params);
        let searchString = req.params.recipeName;
        console.log(searchString);

        if(searchString.length > 1) {
            Recipe.find({$text: {$search: searchString}}, (err, recipe) => {
                if(err) {
                    res.send(err);
                }
                res.json(recipe);
            });
        } else {
            res.send("need more information");
        }
    } */
}
