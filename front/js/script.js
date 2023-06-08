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
  
const promise = fetchItems('http://localhost:3000/api/products');

promise.then((data) => {

        for (const item of data) {

            const itemsContainer = document.querySelector('#items');

            const itemLink = document.createElement('a');
            itemsContainer.appendChild(itemLink);

            const itemArticle = document.createElement('article')
            itemLink.appendChild(itemArticle);

            const itemImage = document.createElement('img')
            const itemName = document.createElement('h3')
            const itemDescription = document.createElement('p')

            itemArticle.appendChild(itemImage);
            itemArticle.appendChild(itemName);
            itemArticle.appendChild(itemDescription);

            itemImage.src = item.imageUrl;
            itemImage.alt = item.altTxt;

            itemName.setAttribute('class', 'productName');
            itemName.textContent = item.name;

            itemDescription.setAttribute('class', 'productDescription');
            itemDescription.textContent = item.description;

            const id = item._id;
            
            itemLink.href = `./product.html?id=${id}`;

        }
    }
);
  