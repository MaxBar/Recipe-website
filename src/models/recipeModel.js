import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RecipeSchema  = new Schema({
    recipeName: {
        type: String,
        required: "Enter a recipe name",
        index: true
    },
    servings: {
        type: Number
    },
    image: { 
        data: Buffer, 
        contentType: String 
    },
    ingredients: [{
        amount: {
            type: Number,
            required: "Specify amount"
        },
        unit: {
            type: String,
            required: "Specify measuring unit"
        },
        ingredient: {
            type: String,
            required: "Write name of ingreddient",
            index: true
        }
    }],
    description: {
        type: String,
        index: true
    },
    nutrients: {
        kcal: Number,
        protein: Number,
        kolhydrater: Number
    },
    category: [{
        type: String,
        index: true
    }],
    author: {
        type: String,
        index: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

RecipeSchema.index({recipeName: "text", description: "text", ingredient: "text"});
RecipeSchema.index({category: "test"});
RecipeSchema.index({author: "text"});