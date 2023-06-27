/*
//récupération des données du localStorage
const cart = getCart();

//variable permaettant l'affiche du prix total
let total = 0;

//fonction appel fetchApi avec une URL en paramètre
async function fetchItems(URL) {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Could not get products: ${error}`);
    }
}

//function englobant l'affichage du panier
function displayCart() {
    
    for (let product of cart) {
        let id = product.id;
        const promise = fetchItems(`http://localhost:3000/api/products/${id}`);
    
        promise.then((data) => {
            displayItemsData(product, data);
            totalPriceProducts(product, data);
            
            
            deleteProduct()
        });
        
        
    
        promise.catch(error => {
            console.log('Problème avec requete Fetch' + error.message);
        });
        
    }
}



displayCart();

totalQuantityProducts();

// calcul du prix total des produits, fonction appelée dans requete fetch pour recup prix via API fetch
function totalPriceProducts(product, data) {
    total += product.quantity * data.price;
    const totalPrice = document.querySelector('#totalPrice');
    totalPrice.textContent = total;
    return total;
}

//calcul du nombre de produits totaux
function totalQuantityProducts() {
    let cart = getCart();
    let number = 0;
    for (let product of cart) {
        number += product.quantity
    }
    const totalQuantity = document.querySelector('#totalQuantity');
    totalQuantity.textContent = number;
    return number;
}


// enregistrement des données dans le localStorage via stringify
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//récupération des données du localStorage
function getCart() {
    let cart = localStorage.getItem('cart');
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

//affichage des données pour chaque produit
function displayItemsData(product, data) {
    //création article
    const cartItems = document.querySelector('#cart__items');
    const cartItem = document.createElement('article')
    cartItem.setAttribute('class', 'cart__item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.setAttribute('data-color', `${product.color}`);
    cartItems.appendChild(cartItem);

    //création 1ère div dans article - image
    const cartItemImgContainer = document.createElement('div');
    cartItemImgContainer.setAttribute('class', 'cart__item__img');
    const cartItemImg = document.createElement('img');
    cartItemImg.src = data.imageUrl;
    cartItemImg.alt = data.altTxt;
    cartItemImgContainer.appendChild(cartItemImg);
    cartItem.appendChild(cartItemImgContainer);

    // création 2eme div dans article - content
    const cartItemContent = document.createElement('div');
    cartItemContent.setAttribute('class', 'cart__item__content');
    cartItem.appendChild(cartItemContent);

    // création div content-description
    const cartItemContentDescription = document.createElement('div');
    cartItemContentDescription.setAttribute('class', 'cart__item__content__description');
    cartItemContent.appendChild(cartItemContentDescription);

    const itemTitre = document.createElement('h2');
    itemTitre.textContent = data.name;
    const itemColor = document.createElement('p');
    itemColor.textContent = product.color;
    const itemPrice = document.createElement('p');
    itemPrice.textContent = data.price + ' €';
    cartItemContentDescription.appendChild(itemTitre);
    cartItemContentDescription.appendChild(itemColor);
    cartItemContentDescription.appendChild(itemPrice);

    //creation div content-settings
    const cartItemContentSettings = document.createElement('div');
    cartItemContentSettings.setAttribute('class', 'cart__item__content__settings');
    cartItemContent.appendChild(cartItemContentSettings);

    const cartItemContentSettingsQuantity = document.createElement('div');
    cartItemContentSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    const itemQuantity = document.createElement('p');
    itemQuantity.textContent = `Qté :`;
    const itemQuantityInput = document.createElement('input');
    itemQuantityInput.setAttribute('type', 'number');
    itemQuantityInput.setAttribute('class', 'itemQuantity');
    itemQuantityInput.setAttribute('name', 'itemQuantity');
    itemQuantityInput.setAttribute('min', '1');
    itemQuantityInput.setAttribute('max', '100');
    itemQuantityInput.setAttribute('value', `${product.quantity}`);

    cartItemContentSettingsQuantity.appendChild(itemQuantity);
    cartItemContentSettingsQuantity.appendChild(itemQuantityInput);

    const cartItemContentSettingsDelete = document.createElement('div');
    cartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

    const itemDelete = document.createElement('p');
    itemDelete.setAttribute('class', 'deleteItem');
    itemDelete.textContent = 'Supprimer';
    cartItemContentSettingsDelete.appendChild(itemDelete);

};

//***************************************************

//fonction permettant de filtrer un produit
function removeFromCart(product) {
    let cart = getCart();
    cart = cart.filter(p => p.id != product.id);
    saveCart(cart);
}

function changeQuantity(product, quantity) {
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct <= 0) {
            removeFromCart(product);
        } else {
            saveCart(cart);
        }
    }
}

function deleteProduct() {
    const buttonDelete = document.querySelector('.deleteItem');
    buttonDelete.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('coucou');
    })
};


*/



let total = 0;

main();
// fonction s'appelant dès le lancement de la page
async function main() {
    const cart = getCart();
    // récupération des articles dans localStorage
    for (let product of cart) {
        const idProduct = product.id;
        const article = await getArticle(idProduct);
        displayArticle(article, product);
        
    }
    changerQuantiteProduit();
    supprimerProduit();
    
}



function getArticle(id) {
    return fetch(`http://localhost:3000/api/products/${id}`)
        .then((reponseHttp) => reponseHttp.json())
        .then((article) =>  article)
        .catch((error) => console.error(`Could not get products: ${error}`))
}

function displayArticle(article, product) {
    //création article
    const cartItems = document.querySelector('#cart__items');
    const cartItem = document.createElement('article')
    cartItem.setAttribute('class', 'cart__item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.setAttribute('data-color', `${product.color}`);
    cartItems.appendChild(cartItem);

    //création 1ère div dans article - image
    const cartItemImgContainer = document.createElement('div');
    cartItemImgContainer.setAttribute('class', 'cart__item__img');
    const cartItemImg = document.createElement('img');
    cartItemImg.src = article.imageUrl;
    cartItemImg.alt = article.altTxt;
    cartItemImgContainer.appendChild(cartItemImg);
    cartItem.appendChild(cartItemImgContainer);

    // création 2eme div dans article - content
    const cartItemContent = document.createElement('div');
    cartItemContent.setAttribute('class', 'cart__item__content');
    cartItem.appendChild(cartItemContent);

    // création div content-description
    const cartItemContentDescription = document.createElement('div');
    cartItemContentDescription.setAttribute('class', 'cart__item__content__description');
    cartItemContent.appendChild(cartItemContentDescription);

    const itemTitre = document.createElement('h2');
    itemTitre.textContent = article.name;
    const itemColor = document.createElement('p');
    itemColor.textContent = product.color;
    const itemPrice = document.createElement('p');
    itemPrice.textContent = article.price + ' €';
    cartItemContentDescription.appendChild(itemTitre);
    cartItemContentDescription.appendChild(itemColor);
    cartItemContentDescription.appendChild(itemPrice);

    //creation div content-settings
    const cartItemContentSettings = document.createElement('div');
    cartItemContentSettings.setAttribute('class', 'cart__item__content__settings');
    cartItemContent.appendChild(cartItemContentSettings);

    const cartItemContentSettingsQuantity = document.createElement('div');
    cartItemContentSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    const itemQuantity = document.createElement('p');
    itemQuantity.textContent = `Qté :`;
    const itemQuantityInput = document.createElement('input');
    itemQuantityInput.setAttribute('type', 'number');
    itemQuantityInput.setAttribute('class', 'itemQuantity');
    itemQuantityInput.setAttribute('name', 'itemQuantity');
    itemQuantityInput.setAttribute('min', '1');
    itemQuantityInput.setAttribute('max', '100');
    itemQuantityInput.setAttribute('value', `${product.quantity}`);

    cartItemContentSettingsQuantity.appendChild(itemQuantity);
    cartItemContentSettingsQuantity.appendChild(itemQuantityInput);

    const cartItemContentSettingsDelete = document.createElement('div');
    cartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

    const itemDelete = document.createElement('p');
    itemDelete.setAttribute('class', 'deleteItem');
    itemDelete.textContent = 'Supprimer';
    cartItemContentSettingsDelete.appendChild(itemDelete);

    totalPriceProducts(article, product);
    totalQuantityProducts();
    
}

//récupération des données du localStorage
function getCart() {
    let cart = localStorage.getItem('cart');
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

//calcul du nombre de produits totaux
function totalQuantityProducts() {
    let cart = getCart();
    let number = 0;
    for (let product of cart) {
        number += Number(product.quantity);
    }
    const totalQuantity = document.querySelector('#totalQuantity');
    //console.log(number)
    totalQuantity.textContent = number;
    //return number;
}


function totalPriceProducts(article, product) {
    total += product.quantity * article.price;
    const totalPrice = document.querySelector('#totalPrice');
    totalPrice.textContent = total;
    return total;
}


function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function changerQuantiteProduit() {
    const productsElements = document.querySelectorAll('input.itemQuantity');
    //console.log(productsElements)
    for (let i = 0; i < productsElements.length; i++) {
        productsElements[i].addEventListener('change', (e) => {
            e.preventDefault();
            let retriveParentData = productsElements[i].closest('.cart__item');
            //console.log(retriveParentData)
            const id = retriveParentData.dataset.id;
            const color = retriveParentData.dataset.color;
            //console.log(color)
            let cart = getCart();
            let foundProduct = cart.find(p => p.id == id && p.color == color);
            //console.log(foundProduct)
            if (foundProduct != undefined) {
                foundProduct.quantity = e.target.value;
            }
            //console.log(foundProduct)
            saveCart(cart);
            //document.querySelector('#cart__items').innerHTML = '';
            //displayArticle(article, product);
            location.reload();
        })
    }
}
/*****************************************************
// prévoir si quantité inférieure ou égale à 0
// prévoir si quantité supp à 100
*///////////////////////////////////////////////////

//fonction permettant de filtrer un produit
function supprimerProduit() {

    const productsElements = document.querySelectorAll('.deleteItem');
    //console.log(productsElements);

    for (let i = 0; i < productsElements.length; i++) {
        productsElements[i].addEventListener('click', (e) => {
            e.preventDefault();
            let retriveParentData = productsElements[i].closest('.cart__item');
            //console.log(retriveParentData)
            const id = retriveParentData.dataset.id;
            const color = retriveParentData.dataset.color;
            //console.log(color)
            let cart = getCart();
            let foundProduct = cart.find(p => p.id == id && p.color == color);
            //console.log(foundProduct)
            cart = cart.filter(p => p !== foundProduct);
            //console.log(cart)
            saveCart(cart);
            location.reload();
        })
    }
}

//prévoir message ajout produit panier et produit supprimer panier