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
        //console.log(livs);

        for(let ingredient of ingredients.ingredients) {
            tempIngredients.push(livs.filter(item => item.Namn === ingredient.ingredient));
        }
        //console.log(tempIngredients[0][0].Naringsvarden);
        for(let naring of tempIngredients) {
            for(let n of naring) {
                for(let i of n.Naringsvarden.Naringsvarde) {
                    for(let ingredient of ingredients.ingredients) {
                        let temp;
                        let ingredientWeight = nutrition.calculateIngredientsWeight(ingredient);
                        let proportions = ingredientWeight / totalWeight;
                        
                        if(i.Forkortning === 'Ener') {
                            temp = i;
                            nutrition.kcal += (parseFloat(temp.Varde) * proportions).toFixed(1);
                        }
                        if(i.Forkortning === 'Kolh') {
                            temp = i;
                            nutrition.kolhydrater += (parseFloat(temp.Varde) * proportions).toFixed(1);
                        }
                        if(i.Forkortning === 'Prot') {
                            temp = i;
                            nutrition.protein += (parseFloat(temp.Varde) * proportions).toFixed(1);
                        }
                    }
                }
            }
        }

        console.log(nutrition.kcal);
        console.log(nutrition.protein);
        console.log(nutrition.kolhydrater);
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
        console.log(totalWeight)
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
        console.log("ingredient weight = " + weight);
        return weight;
    }
}