let params = new URLSearchParams(document.location.search.substring(1));
const price = params.get('totalPrice');
const num = params.get('orderId');

const numCommande = document.querySelector(".numerocommande");
numCommande.innerText = num;
const totalCommande = document.querySelector('.totalcommande');
totalCommande.innerText = parseFloat(price).toFixed(2) + ' €';