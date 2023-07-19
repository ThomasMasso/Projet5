// initialisation variable total pour le calcul du prix total
let total = 0;

//trier les produits par id
const articleOrdonnes = Array.from(getCart());

// trier par ordre croissant
function dynamicSort(property) {
    return function(a, b) {
        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
}
articleOrdonnes.sort(dynamicSort('id'))
//console.log(articleOrdonnes)

main();
// fonction s'appelant dès le lancement de la page
async function main() {
    
    // récupération des articles dans localStorage
    for (let product of articleOrdonnes) {

        const idProduct = product.id;
        const article = await getArticle(idProduct);
        displayArticle(article, product);
        
    }

    changingQuantityProduct();
    deleteProduct();
}

/**
 * récupération d'un article via fetchApi en utilisant son id
 * @param {string} id 
 * @returns {object}
 */
function getArticle(id) {
    return fetch(`http://localhost:3000/api/products/${id}`)
    .then((reponseHttp) => {
        if (!reponseHttp.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }
        return reponseHttp.json()
    })
    .then((article) => article)
    .catch(() => {
        let titleh1 = document.querySelector('h1');
        titleh1.textContent = `Une erreur est survenue lors de l’actualisation de votre panier. Veuillez réessayer.`;
        let sectionCart = document.querySelector('.cart');
        sectionCart.textContent = '';
    })
}

/**
 * affichage des produits dans la page panier
 * @param {object} article // infos provenant de la requête Fetch (id, name, price, description, url image, altTxt)
 * @param {object} product // infos provenant du panier (id, color, quantity)
 */
function displayArticle(article, product) {
    //création container 'article'
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

    // création du bouton supprimer
    const itemDelete = document.createElement('p');
    itemDelete.setAttribute('class', 'deleteItem');
    itemDelete.textContent = 'Supprimer';
    cartItemContentSettingsDelete.appendChild(itemDelete);

    // calcul quantité totale des produits et du prix total
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
    totalQuantity.textContent = number;
}

/**
 * calcul du prix total
 * @param {object} article // info provenant de la requête Fetch (price)
 * @param {object} product // info provenant du panier (quantity)
 */
function totalPriceProducts(article, product) {
    total += product.quantity * article.price;
    const totalPrice = document.querySelector('#totalPrice');
    totalPrice.textContent = total;
    return total;
}

/**
 * sauvegarde du localStorage via stringify
 * @param {object[]} cart 
 */
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// changement de la quantité d'un produit
function changingQuantityProduct() {
    // je sélectionne et stocke tous mes input contenant la quantité du produit
    const productsElements = document.querySelectorAll('input.itemQuantity');
    
    //boucle sur chaque input pour écouter l'évent 'change'
    for (let i = 0; i < productsElements.length; i++) {
        productsElements[i].addEventListener('change', (e) => {
            e.preventDefault();

            // je selectionne et stocke l'élément parent qui a les data-id et data-color
            let retriveParentData = productsElements[i].closest('.cart__item');
            
            // récupération de l'id et de la couleur de l'élément parent
            const id = retriveParentData.dataset.id;
            const color = retriveParentData.dataset.color;
            
            // récupération du panier
            let cart = getCart();

            // recherche du produit avec son id et sa couleur
            let foundProduct = cart.find(p => p.id == id && p.color == color);
            
            // si le produit est trouvé alors je change sa quantité par la nouvelle rentrée par utilisateur
            if (foundProduct != undefined) {

                // je récupère la quantité rentrée par l'utilisateur
                foundProduct.quantity = e.target.value;

                // si la quantité rentrée manuellement est inférieure ou égale à 0, je mets 1 en quantité et lui indique de supprimer le produit à l'aide du bouton prévu
                if (foundProduct.quantity <= 0) {

                    alert('Quantité minimale de commande pour ce produit : 1. Pour supprimer le produit appuyer sur le bouton supprimer');
                    foundProduct.quantity = 1;

                // si la quantité est sup. à 100, j'indiquer à l'utilisateur que la quantité max est de 100
                } else if (foundProduct.quantity > 100) {

                    alert('Quantité maximale de commande pour ce produit : 100');
                    foundProduct.quantity = 100;
                }
            
            }

            // je sauvegarde les nouvelles infos dans le localStorage
            saveCart(cart);
            
            // je refresh la page pour appliquer modifications
            location.reload();
        })
    }
}

//fonction permettant de supprimer un produit
function deleteProduct() {

    // je selectionne et stocke tous les boutons supprimer
    const productsElements = document.querySelectorAll('.deleteItem');
    
    //boucle sur chaque bouton pour écouter l'évent 'click'
    for (let i = 0; i < productsElements.length; i++) {
        productsElements[i].addEventListener('click', (e) => {
            e.preventDefault();

            // je selectionne et stocke l'élément parent qui a les data-id et data-color
            let retriveParentData = productsElements[i].closest('.cart__item');
            
            // récupération de l'id et de la couleur de l'élément parent
            const id = retriveParentData.dataset.id;
            const color = retriveParentData.dataset.color;
            
            // récupération du panier
            let cart = getCart();

            // recherche du produit avec son id et sa couleur
            let foundProduct = cart.find(p => p.id == id && p.color == color);
            
            // je supprime avec méthode filter() le produit du panier
            cart = cart.filter(p => p !== foundProduct);
            
            // je sauvegarde le localStorage
            saveCart(cart);

            // je refresh la page pour appliquer modifications
            location.reload();
        })
    }
}



//////////REGEX//////////

// je sélectionne et stocke mon formulaire
let form = document.querySelector('.cart__order__form');

// ecoute modification sur 'firstName' dans mon form sélectionné
form.firstName.addEventListener('change', function() {
    validName(this);
});

// ecoute modification sur 'lastName' dans mon form sélectionné
form.lastName.addEventListener('change', function() {
    validName(this);
});

// ecoute modification sur 'address' dans mon form sélectionné
form.address.addEventListener('change', function() {
    validAdress(this);
});

// ecoute modification sur 'city' dans mon form sélectionné
form.city.addEventListener('change', function() {
    validName(this);
});

// ecoute modification sur 'email' dans mon form sélectionné
form.email.addEventListener('change', function() {
    validEmail(this);
});

// ecoute soumission formulaire
form.addEventListener('submit', function(e) {
    e.preventDefault();

    //si tous les chanmps sont valide
    if (validName(form.firstName) && validName(form.lastName) && validAdress(form.address) && validEmail(form.email)) {
        
        // récupération du localStorage
        let cart = getCart();
        if (cart !== null) {

            // on créé le tableau contenant les product-ID
            let products = [];
            for (let product of cart) {

                // on ajoute au tableau tous les product-ID
                products.push(product.id)
            }
            

            // création de l'objet global à envoyer au back
            const order = {

                // création du sous-objet contact qui stocke les champs saisis
                'contact' : {
                    'firstName' : form.firstName.value,
                    'lastName' : form.lastName.value,
                    'address' : form.address.value,
                    'city' : form.city.value,
                    'email' : form.email.value
                },

                // création de l'objet products contenant le tableau des product-ID 
                'products' : products
            };
            
            //création de l'en-tête de la requête POST
            const formData = JSON.stringify(order);
            fetch('http://localhost:3000/api/products/order', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: formData
            })
            .then((reponseHttp) => reponseHttp.json())
            .then((data) => {
                // récupération du numéro de commande
               const idConfirmation = data.orderId;

               // utilisation de ne numéro sous forme d'id pour l'envoyer via searchParams
               document.location = `confirmation.html?id=${idConfirmation}`;
            })

        } else {
            alert('Ajoutez un ou des produits au panier');
        }
    }
});

/**
 * création de la fonction utilisant les regExp pour valider la saisie des champs firstName et lastName
 * @param {string} input 
 * @returns {boolean}
 */ 
function validName(input) {
    // creation de la regExp pour validation identité
    let namesRegExp = /^(?=.{1,50}$)[A-Za-z\é\è\ê\ù\à\ç\-]+(?:['_.\s][a-z]+)*$/gims;

    // recuperation de la balise message d'erreur
    let message = input.nextElementSibling;

    //on teste l'expression reguliere
    if (namesRegExp.test(input.value)) {
        message.textContent = '';
        return true;
    } else {
        message.textContent = 'Champ invalide - caractère(s) non autorisé(s)';
        return false;
    }
}

/**
 * création de la fonction utilisant les regExp pour valider la saisie du champ address
 * @param {string} input 
 * @returns {boolean}
 */ 
function validAdress(input) {
    // creation de la regExp pour validation identité
    let adressRegExp = /((^[0-9]*).?((BIS)|(TER)|(QUATER))?)?((\W+)|(^))(([a-z]+.)*)([0-9]{5})?.(([a-z\'']+.)*)$/gm;

    // recuperation de la balise message d'erreur
    let message = input.nextElementSibling;

    //on teste l'expression reguliere
    if (adressRegExp.test(input.value)) {
        message.textContent = '';
        return true;
    } else {
        message.textContent = `L'adresse postale saisie est invalide`;
        return false;
    }
}

/**
 * création de la fonction utilisant les regExp pour valider la saisie du champ email
 * @param {string} input 
 * @returns {boolean}
 */
function validEmail(input) {
    //création de la regExp pour validation email
    let emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    // recuperation de la balise message d'erreur
    let message = input.nextElementSibling;

    //on teste l'expression reguliere
    if (emailRegExp.test(input.value)) {
        message.textContent = '';
        return true;
    } else {
        message.textContent = `L’adresse email saisie est invalide.`;
        return false;
    }
}
