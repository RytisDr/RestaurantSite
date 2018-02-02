
let extra = document.getElementsByClassName("extraInfo");



function moreInfo(e) {
    e.currentTarget.querySelector(".extraInfo").style.display="inline";
}


function hideInfo(e) {
    e.currentTarget.querySelector(".extraInfo").style.display="none";
}

let productlist_link = "http://kea-alt-del.dk/t5/api/productlist";
let image_path = "http://kea-alt-del.dk/t5/site/imgs/small/";
let section = document.querySelector("#menu");
let template = document.querySelector("#temp");

function loadData(link){
    fetch(link).then(e=>e.json()).then(data=>show(data));
}

function show(data){
    data.forEach(element=>{
        let clone = template.cloneNode(true).content;
        clone.querySelector('.productImg').src = image_path + element.image + "-sm.jpg";
        clone.querySelector('.productName').textContent = element.name;
        clone.querySelector('.price').textContent = element.price;

        console.log(element);
        section.appendChild(clone);
    })
    let products = document.querySelectorAll(".product");
    products.forEach(function (elem) {
        elem.addEventListener('mouseover', moreInfo);
        elem.addEventListener('mouseout', hideInfo);
    });
}
loadData(productlist_link);
