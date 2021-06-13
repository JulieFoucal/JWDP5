API = " http://localhost:3000/api/teddies/";
const panier = JSON.parse(localStorage.getItem('panier')) || [];

console.log(panier);



if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

//declaration de la fonction ready
function ready() {
  const removeBtns = document.querySelectorAll('.btn-remove')
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', removeItemFromCard)
  })

  const quantityInputs = document.querySelectorAll('.cart-quantity')
  quantityInputs.forEach((input) => {
    input.addEventListener('change', quantityChange)
  })

  const purchaseBtn = document.querySelector('.btn-commander')
  purchaseBtn.addEventListener('click', commander)
}

//Commander à partir du bouton commander
function commander() {
  const itemsContainer = document.querySelector('.ligneproduit')

  //alerte votre panier est vide
  if (!itemsContainer.hasChildNodes()) {
    return alert('Votre panier est vide')
  }

  while (itemsContainer.hasChildNodes()) {
    itemsContainer.removeChild(itemsContainer.firstChild)
  }

}

function removeItemFromCard(event) {
  let button = event.target
  button.parentElement.parentElement.remove()
  updateCartTotal()
}



  
const afficherleformulaire =() => {

  const formulaire = document.querySelector('#passerlacommande')

  const structureduformulaire = `
  <form id="questions" >
                    <div class="label-margin" for="name">
                        Nom
                    <input id="firstname" type="text" class="form-control" required="">
                    </div>
                    
                    <div class="label-margin" for="firstname">
                        Prénom
                    <input id="name" type="text" class="form-control" required="">
                    </div>
                    <div class="label-margin" for="adress">
                        Adresse postale
                    <input id="adress" type="text" class="form-control" required="">
                    </div>

                    <div class="label-margin" for="zipcode">
                        Code postale
                    <input id="zipcode" type="text" class="form-control" required="">
                    </div>
                    
                    <div class="label-margin" for="city">
                        Ville
                    <input id="city" type="text" class="form-control" required="">
                    </div>
                    <div class="label-margin" for="email">
                        Adresse email
                    <input id="email" class="form-control" type="email" required="">
                    </div>
                    <button class="btn-commander" type="submit">
                        Valider la commande
                    </button>
            </form>
  `
;

formulaire.insertAdjacentHTML("afterend",structureduformulaire);
};

//affichage formulaire
afficherleformulaire();

//recuperer formulaire

localStorage.setItem("firstname", document.querySelector("#firstname").value);

console.log(document.querySelector("#firstname").value);




