let index = 0;

let ingredientList = new Nutrition();
let inglist = Nutrition.livsmedelsList();
console.log(inglist)

$(document).on('keypress.autocomplete', '.ingredient', function() {
    //if(!$(this).data("autocomplete")) {
        $(this).autocomplete({
        source: inglist
        });
    //}
});
//$('.ui-helper-hidden-accessible').css('display', 'none');
//test.livsmedelsList;

$(document).on('click', '.close', function() {
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
});

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
            <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
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

/*$(document).on('click', '.submit-form', (e) => {
    e.preventDefault();
    console.log($('.recipe-form').serializeJSON());
    let data = $('.recipe-form').serializeObject();
    $.post("http://localhost:3000/create-recipe", data);
})*/