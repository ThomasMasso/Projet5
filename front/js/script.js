main();

// création de la fonction principale
async function main() {
    const articles = await getArticles()
    displayArticles(articles)
}

//création de la fonction de récupération du produit via fetchApi
function getArticles() {
    return fetch(`http://localhost:3000/api/products/`)
    .then((reponseHttp) => {
      if (!reponseHttp.ok) {
          throw new Error(`Erreur HTTP : ${reponse.status}`);
      }
      return reponseHttp.json()
  })
  .then((articles) => articles)
  .catch(() => {
    let titleh1 = document.querySelector('h1');
    let titleh2 = document.querySelector('h2');
    titleh1.textContent = 'Le site est actuellement inaccessible';
    titleh2.textContent = '';
    
  })
}

// création de la fonction d'affichage des produits
function displayArticles(articles) {
  
  // récupération de tous les articles de l'api
  for (let article of articles) {

    // je sélectionne et stocke le container global
    const itemsContainer = document.querySelector('#items');
    
    // création du lien vers le produit
    const itemLink = document.createElement('a');
    itemsContainer.appendChild(itemLink);
    
    // création de l'article container
    const itemArticle = document.createElement('article')
    itemLink.appendChild(itemArticle);
    
    //création des container image, nom et description
    const itemImage = document.createElement('img')
    const itemName = document.createElement('h3')
    const itemDescription = document.createElement('p')
    
    // rattachement des container image, nom et description au parent article
    itemArticle.appendChild(itemImage);
    itemArticle.appendChild(itemName);
    itemArticle.appendChild(itemDescription);
    
    // importation des données récupérées via fetchApi
    itemImage.src = article.imageUrl;
    itemImage.alt = article.altTxt;
    
    itemName.setAttribute('class', 'productName');
    itemName.textContent = article.name;
  
    itemDescription.setAttribute('class', 'productDescription');
    itemDescription.textContent = article.description;
    
    // récupération de l'id permettant de faire le lien à la page produit de l'article sélectionné par l'utilisateur
    const id = article._id;
    
    itemLink.href = `./product.html?id=${id}`;
  }

}
