// récupération de l'id via SEARCHPARAMS
const params = (new URL(document.location)).searchParams;
const id = params.get("id");

// je sélectionne et stocke la span recevant le numéro de commande
const validationNumber = document.querySelector('#orderId');

//j'attribue à la span le numéro de commande récupéré via URL
validationNumber.textContent = id;