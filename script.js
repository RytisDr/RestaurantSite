let productlist_link = "http://kea-alt-del.dk/t5/api/productlist";
let image_path = "http://kea-alt-del.dk/t5/site/imgs/small/";
const catLink = "http://kea-alt-del.dk/t5/api/categories";
const pLink = "http://kea-alt-del.dk/t5/api/product?id="
let main = document.querySelector("main");
let template = document.querySelector("#temp");
const nav = document.querySelector("nav")
const fullMenu = document.querySelector("nav a");

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
        ///////////////////////////////////////////////////////////////////////////
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
        ///////////////////////////////SPELLING IN PRODUCT NAMES///////////
        const section = document.querySelector("#" + element.category);
        if (element.name == "Russisk salatRussian salad") {
            element.name = "Russian salad"
        }
        if (element.name == "Stake with vegetables") {
            element.name = "Steak With Vegetables"
        } //////////////////////////////////////////////////////////////////

        let clone = template.cloneNode(true).content;
        clone.querySelector(".productImg").src = image_path + element.image + "-sm.jpg";
        clone.querySelector(".productName").textContent = element.name;
        clone.querySelector(".price").textContent = element.price;
        clone.querySelector(".details").id = 'p_' + element.id;
        clone.querySelector(".shortDescr").textContent = element.shortdescription;


        if (element.discount) {
            const newPrice = Math.ceil(element.price - element.price * element.discount / 100);
            clone.querySelector(".discPrice").textContent = newPrice;
            clone.querySelector(".discPrice").classList.remove("hide");
            clone.querySelector(".price").classList.add("strike");
        }

        if (element.soldout) {
            clone.querySelector(".soldout").classList.remove("hide");
            clone.querySelector(".productImg").classList.add("noStock");
        }
        if (element.vegetarian) {
            clone.querySelector(".vegetarian").classList.remove("hide");
        }
        if (element.alcohol > 0) {
            clone.querySelector(".alcohol").classList.remove("hide");
        }
        fetch(pLink + element.id).then(res => res.json()).then(product => {
            document.querySelector('#p_' + element.id + ' .longDescription').textContent = product.longdescription;
        });
        section.appendChild(clone);
        let products = document.querySelectorAll(".product");

        products.forEach(function (elem) {

            elem.addEventListener('mouseover', moreInfo);

            elem.addEventListener('mouseout', hideInfo);

        });

        function moreInfo(e) {
            e.currentTarget.querySelector(".shortDescr").classList.add("opacity");
            e.currentTarget.querySelector(".details").classList.remove("hide");
            e.currentTarget.querySelector(".productImg").style.filter="blur(3px)"
        }

        function hideInfo(e) {
            e.currentTarget.querySelector(".shortDescr").classList.remove("opacity");
            e.currentTarget.querySelector(".details").classList.add("hide");
            e.currentTarget.querySelector(".productImg").style.filter="blur(0px)";
        }

    });
}
