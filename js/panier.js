//afficher le nombre d'article au panier

const count = localStorage.getItem('number') || 0;
console.log(count);
const numbertag= document.querySelector('.number')
console.log(numbertag);

numbertag.innerHTML = count;

//recuperer les produits dans le local storage

API = " http://localhost:3000/api/teddies/";
const panier = JSON.parse(localStorage.getItem('produits')) || [];

console.log(panier);
const contenant = document.getElementById('containerproduit2');

for (const article of panier){
  console.log(article);
  const content =`
  <div class="ligneproduit" id="containerpanier">

                <div class="imgproduitpanier" id="prodid">
                    <img src="images/teddy_3.jpg" alt="imageproduitpanier" class="imageproduitpanier">
                </div>


                <div class="quantite">
                    quantity
                    <input class="cart-quantity" type="number" value="1"  min="1"/>
                </div>

                <div class="prixproduitpanier" id="prix">
                    30,00 €s
                </div>

                <div class="btnremove">
                    <button class="btn-remove" type="button">ENLEVER DU PANIER</button>
                </div>
            </div>
  
  `
  contenant.innerHTML+=content
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}



//declaration de la fonction ready enlever un article du panier
function ready() {
  const removeBtns = document.querySelectorAll('.btn-remove')
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', removeItemFromCard)
  })

  // const quantityInputs = document.querySelectorAll('.cart-quantity')
  // quantityInputs.forEach((input) => {
  //   input.addEventListener('change', quantityChange)
  // })

  // const purchaseBtn = document.querySelector('.btn-commander')
  // purchaseBtn.addEventListener('click', commander)
}

//Commander à partir du bouton commander
/* 
function commander() {
  const itemsContainer = document.querySelector('.ligneproduit')

  //alerte votre panier est vide
  if (!itemsContainer.hasChildNodes()) {
    return alert('Votre panier est vide')
  }

  while (itemsContainer.hasChildNodes()) {
    itemsContainer.removeChild(itemsContainer.firstChild)
  }

}*/

function removeItemFromCard(event) {
  let button = event.target
  button.parentElement.parentElement.remove()
  updateCartTotal()
}


let boutonCommander = document.querySelector("btn-commander");
console.log(boutonCommander);




boutonCommander.addEventListener("click",() => {
  // recuperer les donnees du formulaire
const coordonnees= document.querySelector('.name')
console.log(coordonnees);

  localStorage.setItem("prenom", document.querySelector("#prenom").value);
  localStorage.setItem("nom", document.querySelector("#nom").value);
  localStorage.setItem("adresse", document.querySelector("#adresse").value);
  localStorage.setItem("zipcode", document.querySelector("#zipcode").value);
  localStorage.setItem("email", document.querySelector("#email").value);


  console.log(document.querySelector("#prenom").value);
})


  

  

/* 
formulaire.insertAdjacentHTML("afterend",structureduformulaire*/


//affichage formulaire


//recuperer formulaire

/*
localStorage.setItem("firstname", document.querySelector("#firstname").value);
localStorage.setItem("firstname", document.querySelector("#firstname").value);*/


// console.log(document.querySelector("#firstname").value);




