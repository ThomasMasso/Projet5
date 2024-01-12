# Projet étudiant 5

## Construisez un site e-commerce en JavaScript

**Obectif** : implémenter un site de e-commerce de manière dynamique.

**Technologies utilisées**
* js (vanilla)

**Tâches réalisées**
* Unifier les travaux déjà réalisés par l’équipe en intégrant dynamiquement les éléments de l’API dans les différentes pages web avec JavaScript
* Mettre en place un plan de test d’acceptation

**Contenu des pages:**
* Page d’accueil montrant (de manière dynamique) tous les articles disponibles à la vente.
* Une page “produit” qui affiche (de manière dynamique) les détails du produit sur lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.
* Une page “panier”. Celle-ci contient plusieurs parties :
  ○ Un résumé des produits dans le panier, le prix total et la possibilité de modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.
  ○ Un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de chiffre dans un champ prénom
* Une page “confirmation” :
  ○ Un message de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant l'identifiant de commande envoyé par l’API.

**Backend**

Le dossier back permet de faire tourner l'api contenant les données des produits.

**Installation**

Il suffit de se positionner dans le dossier backend avec un terminal et de saisir la commande `npm install`

**Lancement du serveur**

Il suffit de se positionner dans le dossier backend avec un terminal et de saisir la commande `node start`. Par défaut le serveur sera lancé sur le port 3000 ( http://localhost:3000 )

**Compétences évaluées pour ce projet**
* Créer un plan de test pour une application
* Gérer des événements JavaScript
* Interagir avec un web service avec JavaScript
* Valider des données issues de sources externes
