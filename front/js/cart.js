//const cart = JSON.parse(localStorage.getItem('cart'));
//console.log(cart)

const cart = getCart();
let total = 0;

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

for (let product of cart) {
    let id = product.id;
    const promise = fetchItems(`http://localhost:3000/api/products/${id}`);
    promise.then((data) => {
        //console.log(data);
        
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
        
        totalPriceProducts(product, data);
        
    })
}

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

// accéder à data-id = dataId en JS

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCart() {
    let cart = localStorage.getItem('cart');
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

function removeFromCart(product) {
    let cart = getCart();
    cart = cart.filter(p => p.id != product.id);
    saveCart(cart);
}