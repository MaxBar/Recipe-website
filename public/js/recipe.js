let servings;
let originalAmount = [];
let spanAmount = [];
let amount = [];
let amountPerServing = [];

$(document).ready(() => {
    spanAmount = $('.amount');
    console.log(spanAmount[0].innerHTML);
    console.log(spanAmount[1].innerHTML);
    //console.log(spanAmount);
    $('.amount').each(function() {
        console.log( $(this).text() );
        //spanAmount.push($(this));
        //console.log(spanAmount[0]);
        //console.log(spanAmount[0].textContent);
        originalAmount.push(parseInt($(this).text()));
    });
    amount = $('.amount');
    servings = $('.servings').val();
    for(let i of originalAmount) {
        amountPerServing.push(i/servings);
        console.log(amountPerServing);
    }
});

$('.servings').on("keyup change", e => {
    console.log("change");
    let newServings = $('.servings').val();
    console.log("Sevings: " + newServings);
    changeAmount(newServings);
    //console.log(test);
});

function changeAmount(servings) {
    $('.amount').each(function(amount) {
        for(let i = 0; i < originalAmount.length; ++i) {
            console.log("original amount: " + originalAmount[i]);
            console.log("changed amount: " + servings);
            let number = servings * amountPerServing[i];
            spanAmount[i].innerHTML = number.toString();
            console.log($(this).text());
        }
        //$(this).text = 
        //let newRatio = changedAmount / servings
    });
}