let index = 0;

let ingredientList = new Nutrition();
let inglist = Nutrition.livsmedelsList();

$(document).on('keypress.autocomplete', '.ingredient', function() {
        $(this).autocomplete({
            minLength: 2,
            source: inglist
        });
    //}
});

/*$(document).on('click', '.close', function() {
    if($(this).parent().parent().hasClass('last')) {
        $(this).parent().parent().prev('div').addClass('last');
        $(this).parent().parent().prev('div').append(`
        <div class="col-1">
            <button type="button" class="add btn btn-primary ml-4" aria-label="Add">Ny</button>
        </div>
        `)
        $(this).parent().parent('div').first().remove();
    } else {
        $(this).parent().parent('div').first().remove();
    }
});*/

$(document).on('click', '.add', function () { 
    $('.last').parent().append(`
    <div class="form-group form-row last">
        <div class="form-group col-1">
            <input type="text" class="form-control" name="ingredients[${++index}][amount]" required pattern="\\d*">
        </div>
        <div class="form-group col-2">
            <select class="form-control" name="ingredients[${index}][unit]">
                <option value="g">g</option>
                <option value="hg">hg</option>
                <option value="kg">kg</option>
            </select>
        </div>
        <div class="form-group col-6">
            <input type="text" class="form-control ingredient" name="ingredients[${index}][ingredient]">
        </div>
        <div class="col-1">
            <button type="button" class="add btn btn-primary ml-4" aria-label="Add">Ny</button>
        </div>
    </div>`
    )
    $(this).parent().parent('.last').removeClass('last');
    $(this).parent().remove();
    $(this).remove();
});