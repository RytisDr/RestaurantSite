let productlist_link = "http://kea-alt-del.dk/t5/api/productlist";
let image_path = "http://kea-alt-del.dk/t5/site/imgs/small/";
const catLink = "http://kea-alt-del.dk/t5/api/categories";
const pLink = "http://kea-alt-del.dk/t5/api/product?id="
let main = document.querySelector("main");
let template = document.querySelector("#temp");
const nav = document.querySelector("nav")
const fullMenu = document.querySelector("nav a");
const modal = document.querySelector(".modal");


fetch(catLink).then(result => result.json()).then(data => categorise(data));

/////////////////////////////CATEGORISE INTO SECTIONS/////////////////////////////////////////////////
function categorise(data) {
    data.forEach(category => {
        const section = document.createElement("section");
        const h2 = document.createElement("h2");
        const a = document.createElement("a");
        section.id = category;
        h2.textContent = category;
        section.appendChild(h2);
        main.appendChild(section);
        a.textContent = category;

        ///////////////////////////////////FIX SPELLING MISTAKES IN CATEGORIES//////////////////////////////////////////////
        if ((a, h2).textContent == "main" || (a, h2).textContent == "starter" || (a, h2).textContent == "dessert") {
            a.append("s");
            h2.append("s");
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        a.href = "#";
        a.addEventListener("click", () => filter(category));
        nav.appendChild(a);
    });
    fetch(productlist_link).then(result => result.json()).then(data => show(data));
}


//////////////////////FILTER INTO CATEGORIES UPON A CLICK////////////////

fullMenu.addEventListener('click', () => filter("all"));

function filter(category) {
    document.querySelectorAll("main section").forEach(section => {
        if (section.id == category || category == "all") {
            section.classList.remove('hide');
        } else {
            section.classList.add('hide');
        }
    })
}

///////////////////////////// SHOW DATA /////////////////////////////////////////////

function show(data) {
    data.forEach(element => {
        const section = document.querySelector("#" + element.category);
        if (element.name == "Russisk salatRussian salad") {
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
        fetch(pLink + element.id).then(res => res.json()).then(product => showDetail(product)); //STRUGLING TO SHOW CORRECT DATA//////////////////
        section.appendChild(clone);
    })

    ///////////////////////////////////////////SHOW EXTRA INFO FUNCTION WORKS, DOESNT SHOW CORRECT INFO////////////////////
    let products = document.querySelectorAll(".product");

    function showDetail(product) {
        products.forEach(function (elem) {
            elem.addEventListener('mouseover', moreInfo);
            elem.addEventListener('mouseout', hideInfo);
        })

        function moreInfo(e) {
            e.currentTarget.querySelector(".modal").classList.remove("hide");
            e.currentTarget.querySelector(".modal-description").textContent = elem.longdescription; /*(".extraInfo").style.display = "inline";*/
        }

        function hideInfo(e) {
            e.currentTarget.querySelector(".modal").classList.add("hide"); /*(".extraInfo").style.display = "none";*/
        }


    }

}
