let products = document.querySelectorAll(".product");

products.forEach(function(elem){
elem.addEventListener('mouseover', moreInfo);
         });

function moreInfo(){
    console.log("work");
    let extra = document.getElementsByClassName("extraInfo");
    extra.forEach(function(elem){
        elem.style.display = "inline";
    })
   /* products[0].addEventListener('mouseout', function(){
        extra[0].style.display = 'none';
    })*/
}
