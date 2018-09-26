class Nutrition {
    constructor() {
        this.kcal = 0;
        this.protein = 0;
        this.kolhydrater = 0;
    }

    static livsmedelsList() {
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
        //for(let item of result) {
            //list.push(item._name);
            //console.log(list);
            //return list;
                //return extractNames(response);
                //console.log(response);
                //return response;
            //}
    }

    extractNames(response) {
        
    }
}