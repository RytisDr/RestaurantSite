let extra = document.getElementsByClassName("extraInfo");


function moreInfo(e) {
    e.currentTarget.querySelector(".extraInfo").style.display = "inline";
}

function hideInfo(e) {
    e.currentTarget.querySelector(".extraInfo").style.display = "none";
}

let productlist_link = "http://kea-alt-del.dk/t5/api/productlist";
let image_path = "http://kea-alt-del.dk/t5/site/imgs/small/";
const catLink = "http://kea-alt-del.dk/t5/api/categories";
let main = document.querySelector("main");
let template = document.querySelector("#temp");


fetch(catLink).then(result=>result.json()).then(data=>categorise(data));

function categorise(data){
    data.forEach(category => {
    const section = document.createElement("section");
    const h2 = document.createElement("h2");
    section.id = category;
    h2.textContent = category;
    section.appendChild(h2);
    main.appendChild(section);

    });
    fetch(productlist_link).then(result => result.json()).then(data => show(data));
}

function show(data) {
    data.forEach(element => {
        const section = document.querySelector("#" + element.category);
        if(element.name == "Russisk salatRussian salad"){
            element.name = "Russian salad"
        }
        let clone = template.cloneNode(true).content;
        clone.querySelector('.productImg').src = image_path + element.image + "-sm.jpg";
        clone.querySelector('.productName').textContent = element.name;
        clone.querySelector('.price').textContent = element.price;


        if (element.discount) {
            const newPrice = Math.ceil(element.price - element.price * element.discount / 100);
            clone.querySelector(".discPrice").textContent = newPrice;
            clone.querySelector(".discPrice").classList.remove("hide");
            clone.querySelector(".price").classList.add("strike");
        }
        section.appendChild(clone);
    })

    let products = document.querySelectorAll(".product");
    products.forEach(function (elem) {
        elem.addEventListener('mouseover', moreInfo);
        elem.addEventListener('mouseout', hideInfo);
    });
}

