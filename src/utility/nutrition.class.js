import { Livsmedel } from '../utility/livsmedel.class';

export class Nutrition {
    constructor() {
        this.kcal = 0;
        this.protein = 0;
        this.kolhydrater = 0;
    }

    /*get livsmedel() {
        return this.livsmedel;
    }

    set livsmedel(data) {
        this.livsmedel = JSON.parse(fs.readFileSync(__dirname + '/../data/livsmedelsdata.json', 'utf8'));
    }*/

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
                .filter( i => i.Forkortning === 'Ener' || i.Forkortning === 'Kolh' || i.Forkortning === 'Prot')));
        }

        for(let i = 0; i < ingredients.ingredients.length; ++i) {
            let ingredientWeight = nutrition.calculateIngredientsWeight(ingredients.ingredients[i]);
            let proportions = ingredientWeight / totalWeight;
            for(let j = 0; j < tempNutrients[i].length; ++j) {
                console.log("Totalvikt: " + totalWeight);
                console.log("Ingredientvikt: " + ingredientWeight);
                console.log("Proportionern: " + proportions);
                if(tempNutrients[i][j].Forkortning === 'Ener') {
                    console.log("Ingredientens kalorier: " + tempNutrients[i][j].Varde);
                    nutrition.kcal += (parseFloat(tempNutrients[i][j].Varde) * proportions);
                    console.log("Total Kalorier: " + nutrition.kcal);
                }
                if(tempNutrients[i][j].Forkortning === 'Kolh') {
                    console.log("Ingredientens kolhydrater: " + tempNutrients[i][j].Varde);
                    nutrition.kolhydrater += (parseFloat(tempNutrients[i][j].Varde) * proportions);
                    console.log("Total Kolhydrater: " + nutrition.kolhydrater);
                }
                if(tempNutrients[i][j].Forkortning === 'Prot') {
                    console.log("Ingredientens proteiner: " + tempNutrients[i][j].Varde);
                    nutrition.protein += (parseFloat(tempNutrients[i][j].Varde) * proportions);
                    console.log("Total Protein: " + nutrition.protein);
                }

                if(j == tempNutrients[i].length - 1) {
                    nutrition.kcal = nutrition.kcal >> 0;
                    nutrition.kolhydrater = nutrition.kolhydrater >> 0;
                    nutrition.protein = nutrition.protein >> 0;
                }
            }
        }
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