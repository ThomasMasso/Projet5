const cart = JSON.parse(localStorage.getItem('cart'));
console.log(cart)

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
        const cartItems = document.querySelector('#cart__items');
        const cartItem = document.createElement('article')
        cartItem.setAttribute('class', 'cart__item');
        cartItem.setAttribute('data-id', `${product.id}`);
        cartItem.setAttribute('data-color', `${product.color}`);
        cartItems.appendChild(cartItem);

        const cartItemImgContainer = document.createElement('div');
        cartItemImgContainer.setAttribute('class', 'cart__item__img');
        const cartItemImg = document.createElement('img');
        cartItemImg.src = data.imageUrl;
        cartItemImg.alt = data.altTxt;
        cartItemImgContainer.appendChild(cartItemImg);
        cartItem.appendChild(cartItemImgContainer);

    })
    
}
