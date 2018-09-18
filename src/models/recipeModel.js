import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RecipeSchema  = new Schema({
    recipeName: {
        type: String,
        required: "Enter a recipe name",
        index: true
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
            required: "Write name of ingreddient"
        }
    }],
    description: {
        type: String,
        index: true
    },
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

RecipeSchema.index({recipeName: "text", description: "text"});