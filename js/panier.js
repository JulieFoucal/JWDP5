//afficher le nombre d'article au panier

const numbertag = document.querySelector('.number')
console.log(numbertag);

numbertag.innerHTML = computeNumberOfItems();

//recuperer les produits dans le local storage

API = " http://localhost:3000/api/teddies/";
const panier = JSON.parse(localStorage.getItem('produits')) || [];
const contenant = document.getElementById('containerproduit2');

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

function computeTotal() {
  let products = JSON.parse(localStorage.getItem('produits')) || [];
  let total = 0;
  for(product of products) {
    total += product.itemsPrice;
  }
  localStorage.setItem('totalPrice', total);

  let totalPriceDOM = document.querySelector('.totalprice');
  totalPriceDOM.innerText = parseInt(localStorage.getItem('totalPrice')).toFixed(2) + ' €';
}

function computeNumberOfItems() {
  let products = JSON.parse(localStorage.getItem('produits')) || [];
  let total = products.reduce((acc, item) => {
    let number = parseInt(item.count);
    if(!isNaN(number))
      acc += number;
    return acc;
  },0);
  return total;
}


//declaration de la fonction ready enlever un article du panier
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


//enlever un produit du panier et du localStorage

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
}

function changeItemQuantity(event) {
  let value = event.target.value;
  let id  = event.target.parentElement.parentElement.id;
  let products = JSON.parse(localStorage.getItem('produits')) || [];
  let itemsPrice = 0;
  for(product of products) {
    if(product.id === id) {
      product.count = parseInt(value);
      product.itemsPrice = product.price * value;
      itemsPrice = product.itemsPrice;
    }
  }
  localStorage.setItem('produits', JSON.stringify(products));
  let priceItems = document.querySelectorAll('.prixproduitpanier');
  priceItems.forEach(item => {
      if(item.parentElement.id === id) {
        item.textContent = parseFloat(itemsPrice).toFixed(2) + ' €';
      }
  });

  let totalPrice = products.reduce((acc,item) => {
    acc += item.itemsPrice;
    return acc;
  }, 0);
  localStorage.setItem('totalPrice', totalPrice);
  document.querySelector('.totalprice').textContent = parseFloat(totalPrice).toFixed(2)+ ' €';
  document.querySelector('.number').textContent = computeNumberOfItems();
}

let boutonCommander = document.querySelector(".btn-commander");
console.log(boutonCommander);


boutonCommander.addEventListener("click", () => {
  // recuperer les donnees du formulaire 1
  const coordonnees = document.querySelector('.name')

  const user = {
  "prenom": document.querySelector("#prenom").value,
  "nom": document.querySelector("#nom").value,
  "adresse": document.querySelector("#adresse").value,
  "zipcode": document.querySelector("#zipcode").value,
  "email": document.querySelector("#email").value,
  };
  console.log(user);
  for(item in user) {
    if (user[item] === undefined || user[item] === "") {return;}
  }
  localStorage.setItem('user', JSON.stringify(user));
  window.location.href = "pagecommande.html";
})}



      // Enlever les produits du localstorage après validation de la commande

 
