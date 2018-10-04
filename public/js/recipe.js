let servings;
let originalAmount = [];
let spanAmount = [];
let amount = [];
let amountPerServing = [];

$(document).ready(() => {
    spanAmount = $('.amount');
    $('.amount').each(function() {
        originalAmount.push(parseInt($(this).text()));
    });
    amount = $('.amount');
    servings = $('.servings').val();
    for(let i of originalAmount) {
        amountPerServing.push(i/servings);
    }
});

$('.servings').on("keyup change", e => {
    let newServings = $('.servings').val();
    changeAmount(newServings);
});

function changeAmount(servings) {
    $('.amount').each(function(amount) {
        for(let i = 0; i < originalAmount.length; ++i) {
            let number = (servings * amountPerServing[i]).toFixed(2);
            spanAmount[i].innerHTML = number.toString();
        }
    });
}