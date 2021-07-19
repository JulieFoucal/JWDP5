const API = " http://localhost:3000/api/teddies";

const panier = JSON.parse(localStorage.getItem('produits')) || [];
const price = localStorage.getItem('totalPrice');

const totalCommande = document.querySelector('.totalcommande');
totalCommande.innerText = parseFloat(price).toFixed(2) + ' €';

localStorage.removeItem('produits');