let products = document.querySelectorAll(".product");
let extra = document.getElementsByClassName("extraInfo");

products.forEach(function (elem) {
    elem.addEventListener('mouseover', moreInfo);
    elem.addEventListener('mouseout', hideInfo);
});

function moreInfo() {

}


function hideInfo() {

}
/*
function moreInfo() {
    console.log("work");
    let extra = document.getElementsByClassName("extraInfo");
    extra.forEach(function (elem) {
        elem.style.display = "inline";
    })
    products[0].addEventListener('mouseout', function () {
        extra[0].style.display = 'none';
    })
}
*/
