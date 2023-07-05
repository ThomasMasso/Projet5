// récupération de l'id via SEARCHPARAMS
const params = (new URL(document.location)).searchParams;
const id = params.get("id");

main();

// création de la fonction principale
async function main() {
    const article = await getArticle()
    displayArticle(article)
}

//création de la fonction de récupération du produit via fetchApi
function getArticle() {
    return fetch(`http://localhost:3000/api/products/${id}`)
    .then((reponseHttp) => {
        if (!reponseHttp.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }
        return reponseHttp.json()
    })
    .then((article) => article)
    .catch(() => document.location = `./index.html`)
}

// création de la fonction d'affichage du produit
function displayArticle(article) {

    // création container image
    const itemImageContainer = document.querySelector('.item__img');
    const itemImage = document.createElement('img');
    itemImage.src = article.imageUrl;
    itemImage.alt = article.altTxt;
    itemImageContainer.appendChild(itemImage);

    // récupération élément html pour afficher le nom du produit
    const itemName = document.querySelector('#title');
    itemName.textContent = article.name;

    // récupération élément html pour afficher le prix du produit
    const itemPrice = document.querySelector('#price');
    itemPrice.textContent = article.price;

    // récupération élément html pour afficher la description du produit
    const itemDescription = document.querySelector('#description');
    itemDescription.textContent = article.description;

    // récupération élément html pour afficher les couleurs du produit
    for (const color of article.colors) {
        const itemColorsContainer = document.querySelector('#colors');
        let itemColors = document.createElement('option');
        itemColors.value = color;
        itemColors.textContent = color;
        itemColorsContainer.appendChild(itemColors);
    }
}

// création de l'écoute sur le bouton 'ajouter au panier'
// je sélectionne et stocke le bouton
const button = document.querySelector('#addToCart');
    button.addEventListener('click', () => {

        // je récupère la couleur et la quantité choisies par l'utilisateur
        const itemColorChoose = document.querySelector('#colors').value;
        const itemQuantityChoose = Number(document.querySelector('#quantity').value);

        // je test la mise au panier : une couleur et une quantité sup à 1
        if (itemColorChoose != '' && itemQuantityChoose >=1 && itemQuantityChoose <= 100){

            // je créé l'objet à envoyer au localStorage avec id, couleur et quantité choisies
            const itemAddCart = {
                'id': id,
                'color': itemColorChoose,
                'quantity': itemQuantityChoose
            };
            
            // je sauvegarde le panier et indique que le produit a été ajouté au panier
            addCart(itemAddCart);
            alert('Produit ajouté au panier')

            // reset les champs des input color et quantité
            let colorReset = document.querySelector('#colors');
            colorReset.value = '';
            let quantityReset = document.querySelector('#quantity');
            quantityReset.value = 0;
            
        } else {

            // si l'utilisateur ne renseigne pas une couleur et/ou une quantité valide (1-100), je l'informe
            alert('Veuillez choisir une couleur et une quantité entre 1 et 100')
        }
        
    })

// envoi du panier dans localStorage avec sérialisation
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// récupération du panier - si panier vide création du tableau regroupant les produits sinon désérialisation
function getCart() {
    let cart = localStorage.getItem('cart');
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

// ajout du produit dans le panier en ne créant pas de doublons (quantité additionnée si produit sélec est déjà dans panier même id, même color)
function addCart(product) {
    let cart = getCart();
    let foundProduct = cart.find(p => p.id === product.id && p.color === product.color);
    if (foundProduct != undefined) {
        foundProduct.quantity += product.quantity;
    } else {
        product.quantity = product.quantity;
        cart.push(product);
    }
    saveCart(cart);
}