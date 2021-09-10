//afficher le nombre d'article au panier

const numbertag = document.querySelector('.number')
console.log(numbertag);

//chargement du nombre de produits dans le panier//
numbertag.innerHTML = computeNumberOfItems();

//recuperer les produits dans le local storage//
API = " http://localhost:3000/api/teddies/";
const panier = JSON.parse(localStorage.getItem('produits')) || [];
const contenant = document.getElementById('containerproduit2');

//html ligne produit présente dans le panier//
for (const article of panier) {
  const content = `
  <div class="ligneproduit" id="${article.id}">
                <div class="imgproduitpanier" id="produit">
                    <img src="${article.image}" alt="imageproduitpanier" class="imageproduitpanier">
                </div>
                <div class="name" id="name"  alt="nameproduit" class="nameproduit">
                ${article.name} 
                </div>
                <div class="color" id="color">
                ${article.color}
                </div>
                <div class="quantite">
                    quantity
                    <input class="cart-quantity" type="number" value="${ article.count || 1}"  min="1"/>
                </div>
                <div class="prixproduitpanier" id="prix">
                ${ article.itemsPrice ? (article.itemsPrice).toFixed(2) : (article.price).toFixed(2)} €
                </div>
                <div class="btnremove">
                    <button  class="btn-remove" type="button">ENLEVER DU PANIER</button>
                </div>
            </div>
  
  `
  contenant.innerHTML += content
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}


//fonction calcul du prix total dans le panier//
function computeTotal() {
  let products = JSON.parse(localStorage.getItem('produits')) || [];
  let total = 0;
  for (product of products) {
    total += product.itemsPrice;
  }
  localStorage.setItem('totalPrice', total);

  let totalPriceDOM = document.querySelector('.totalprice');
  totalPriceDOM.innerText = parseInt(localStorage.getItem('totalPrice')).toFixed(2) + ' €';
  return total;
}


//fonction calcul du nombre de produits dans le panier//
function computeNumberOfItems() {
  let products = JSON.parse(localStorage.getItem('produits')) || [];
  let total = products.reduce((acc, item) => {
    let number = parseInt(item.count);
    if (!isNaN(number))
      acc += number;
    return acc;
  }, 0);
  return total;
}


//fonction enlever un article du panier//
function ready() {
  const removeBtns = document.querySelectorAll('.btn-remove')
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', removeItemFromCard)
  })
  const quantity = document.querySelectorAll('.cart-quantity')
  quantity.forEach((input) => {
    input.addEventListener('input', changeItemQuantity)
  })
  computeTotal();



  //enlever un produit du panier et du localStorage//
  function removeItemFromCard(event) {
    let button = event.target;
    let toDeleteId = button.parentElement.parentElement.id;
    button.parentElement.parentElement.remove();
    let products = JSON.parse(localStorage.getItem('produits')) || [];
    products = products.filter((product) => {
      return product.id !== toDeleteId;
    });
    localStorage.setItem('produits', JSON.stringify(products));
    computeTotal();
    document.querySelector('.number').textContent = computeNumberOfItems();
  }

  //Fonction pour changer la quantité des produits voulues dans le panier//
  function changeItemQuantity(event) {
    let value = event.target.value;
    let id = event.target.parentElement.parentElement.id;
    let products = JSON.parse(localStorage.getItem('produits')) || [];
    let itemsPrice = 0;
    for (product of products) {
      if (product.id === id) {
        product.count = parseInt(value);
        product.itemsPrice = product.price * value;
        itemsPrice = product.itemsPrice;
      }
    }
    
    localStorage.setItem('produits', JSON.stringify(products));
    let priceItems = document.querySelectorAll('.prixproduitpanier');
    priceItems.forEach(item => {
      if (item.parentElement.id === id) {
        item.textContent = parseFloat(itemsPrice).toFixed(2) + ' €';
      }
    });

    let totalPrice = products.reduce((acc, item) => {
      acc += item.itemsPrice;
      return acc;
    }, 0);
    localStorage.setItem('totalPrice', totalPrice);
    document.querySelector('.totalprice').textContent = parseFloat(totalPrice).toFixed(2) + ' €';
    document.querySelector('.number').textContent = computeNumberOfItems();
  }

  let boutonCommander = document.querySelector(".btn-commander");

  let monformulaire = document.getElementById("inscription");

  monformulaire.addEventListener("submit", function (event) {
    event.preventDefault();

    //verification de tout les champs 


    let products = JSON.parse(localStorage.getItem('produits')) || [];

    let empty = document.querySelector('.empty');
    let email = document.querySelector('#email').value;
    let pattern = /^.+@.+\..+$/;

    let form = document.getElementById('inscription');
    let formData = new FormData(form);

    let processedProducts = [];
    for (let i of products) {
      for (let j = 0; j < i.count; j++) {
        processedProducts.push(i.id.split('-')[0]);
      }
    }


    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contact: {
            firstName: formData.get('prenom'),
            lastName: formData.get('nom'),
            address: formData.get('adresse'),
            city: formData.get('ville'),
            email: formData.get('email'),

          },
          products: processedProducts
        })
      })
      .then((response) => response.json())
      .then((response) => {
        let totalPrice = localStorage.getItem('totalPrice');
        localStorage.removeItem('produits');
        localStorage.setItem('number', "0");
        localStorage.setItem('totalPrice', "0");
        window.location.href = `/pagecommande.html?orderId=${response.orderId}&totalPrice=${totalPrice}`;
      })
      .catch(error => console.log(error));

    //localStorage.setItem('user', JSON.stringify(user));
    //window.location.href = "pagecommande.html";
  });
  //ouvrir  la page validation commande
}