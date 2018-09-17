import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RecipeSchema  = new Schema({
            recipeName: {
                type: String,
                required: "Enter a first name"
            },
            ingredients: [{
                amount: Number,
                unit: String,
                ingredient: String
            }],
            desciption: String,
            nutrients: [{
                nutrient: String,
                value: Number,
                unit: String
            }],
            author: String,
            created_date: {
                type: Date,
                default: Date.now
            }
        })