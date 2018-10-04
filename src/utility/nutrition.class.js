import { Livsmedel } from '../utility/livsmedel.class';

export class Nutrition {
    constructor() {
        this.kcal = 0;
        this.protein = 0;
        this.kolhydrater = 0;
        this.mattat = 0;
        this.omattat = 0;
        this.fleromattat = 0;
        this.salt = 0;
    }

    static livsmedelsListNames() {
        let list = [];
        let result = [];
        let getList = (function() {
            let getList = null;
            $.ajax({
                type: "GET",
                async: false,
                url: 'data/livsmedelsdata.json',
                success: function(response) {
                    list = response;
                }
            });
        })();
        for(let item of list) {
            result.push(item.Namn);
        }
        return result;
    }

    livsmedelsList() {
        let getList = (function() {
            let getList = null;
            $.ajax({
                type: "GET",
                async: false,
                url: 'data/livsmedelsdata.json',
                success: function(response) {
                    return response;
                }
            });
        })();
    }

    calculateNutritions(ingredients) {
        let nutrition = new Nutrition();
        let tempIngredients = [];
        let totalWeight = nutrition.calculateTotalWeight(ingredients);
        let livs = Livsmedel.livsmedel();

        for(let ingredient of ingredients.ingredients) {
            tempIngredients.push(livs.filter(item => item.Namn === ingredient.ingredient));
        }

        let tempNutrients = [];
        for(let ingredient of tempIngredients) {
            tempNutrients.push(ingredient
                .flatMap( n => n.Naringsvarden.Naringsvarde
                .filter( i => i.Forkortning === 'Ener' || 
                i.Forkortning === 'Kolh' || 
                i.Forkortning === 'Prot' || 
                i.Forkortning === 'Mfet' || 
                i.Forkortning === 'Mone' || 
                i.Forkortning === 'Pole' || 
                i.Forkortning === 'NaCl')));
        }

        for(let i = 0; i < ingredients.ingredients.length; ++i) {
            let ingredientWeight = nutrition.calculateIngredientsWeight(ingredients.ingredients[i]);
            let proportions = ingredientWeight / totalWeight;
            for(let j = 0; j < tempNutrients[i].length; ++j) {
                if(tempNutrients[i][j].Forkortning === 'Ener') {
                    nutrition.kcal += (parseFloat(tempNutrients[i][j].Varde) * proportions);
                }
                if(tempNutrients[i][j].Forkortning === 'Kolh') {
                    nutrition.kolhydrater += (parseFloat(tempNutrients[i][j].Varde) * proportions);
                }
                if(tempNutrients[i][j].Forkortning === 'Prot') {
                    nutrition.protein += (parseFloat(tempNutrients[i][j].Varde) * proportions);
                }
                if(tempNutrients[i][j].Forkortning === 'Mfet') {
                    nutrition.mattat += (parseFloat(tempNutrients[i][j].Varde) * proportions);
                }
                if(tempNutrients[i][j].Forkortning === 'Mone') {
                    nutrition.omattat += (parseFloat(tempNutrients[i][j].Varde) * proportions);
                }
                if(tempNutrients[i][j].Forkortning === 'Pole') {
                    nutrition.fleromattat += (parseFloat(tempNutrients[i][j].Varde) * proportions);
                }
                if(tempNutrients[i][j].Forkortning === 'NaCl') {
                    nutrition.salt += (parseFloat(tempNutrients[i][j].Varde) * proportions);
                }

                if(j == tempNutrients[i].length - 1) {
                }
            }
        }
        nutrition.kcal = nutrition.kcal.toFixed(2);
        nutrition.kolhydrater = nutrition.kolhydrater.toFixed(2);
        nutrition.protein = nutrition.protein.toFixed(2);
        nutrition.mattat = nutrition.mattat.toFixed(2);
        nutrition.omattat = nutrition.omattat.toFixed(2);
        nutrition.fleromattat = nutrition.fleromattat.toFixed(2);
        nutrition.salt = nutrition.salt.toFixed(2);
        
        return nutrition;
    }

    calculateTotalWeight(data) {
        let totalWeight = 0;
        for(let ingredient of data.ingredients) {
            if(ingredient.unit == 'g') {
                totalWeight += parseInt(ingredient.amount, 10);
            } else if(ingredient.unit == 'hg') {
                totalWeight += parseInt(ingredient.amount, 10) * 100;
            } else {
                totalWeight += parseInt(ingredient.amount, 10) * 1000;
            }
        }
        return totalWeight;
    }
    
    calculateIngredientsWeight(data) {
        let weight = 0;
        if(data.unit == 'g') {
            weight += parseInt(data.amount, 10);
        } else if(data.unit == 'hg') {
            weight += parseInt(data.amount, 10) * 100;
        } else {
            weight += parseInt(data.amount, 10) * 1000;
        }
        return weight;
    }
}