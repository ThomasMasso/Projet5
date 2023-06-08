const params = (new URL(document.location)).searchParams;
const id = params.get("id");
//console.log(id);

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

// récupération de l'article sélectionné depuis la page accueil
const promise = fetchItems(`http://localhost:3000/api/products/${id}`);

promise.then((data) => {
    const itemImageContainer = document.querySelector('.item__img');
    const itemImage = document.createElement('img');
    itemImage.src = data.imageUrl;
    itemImage.alt = data.altTxt;
    
    itemImageContainer.appendChild(itemImage);

    const itemName = document.querySelector('#title');
    itemName.textContent = data.name;

    const itemPrice = document.querySelector('#price');
    itemPrice.textContent = data.price;

    const itemDescription = document.querySelector('#description');
    itemDescription.textContent = data.description;

    for (const color of data.colors) {
        const itemColorsContainer = document.querySelector('#colors');
        let itemColors = document.createElement('option');
        itemColors.value = color;
        itemColors.textContent = color;
        itemColorsContainer.appendChild(itemColors);
    }

});


    
    
const button = document.querySelector('#addToCart');
    button.addEventListener('click', () => {

        const itemColorChoose = document.querySelector('#colors').value;
        const itemQuantityChoose = Number(document.querySelector('#quantity').value);

        if (itemColorChoose != '' && itemQuantityChoose >=1){
            const itemAddBasket = {
                'id': id,
                'color': itemColorChoose,
                'quantity': itemQuantityChoose
            };
    
            addBasket(itemAddBasket);
        }
        
    })

function saveBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
}

function getBasket() {
    let basket = localStorage.getItem('basket');
    if (basket == null) {
        return [];
    } else {
        return JSON.parse(basket);
    }
}

function addBasket(product) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id === product.id && p.color === product.color);
    if (foundProduct != undefined) {
        foundProduct.quantity += product.quantity;
    } else {
        product.quantity = product.quantity;
        basket.push(product);
    }
    saveBasket(basket);
}

