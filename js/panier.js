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
    return alert('Vous panier est vide')
  }

  while (itemsContainer.hasChildNodes()) {
    itemsContainer.removeChild(itemsContainer.firstChild)
  }

  updateCartTotal()
  alert("Merci d'avoir passsé commande")
}

function removeItemFromCard(event) {
  let button = event.target
  button.parentElement.parentElement.remove()
  updateCartTotal()
}

//declaration quantité pas en dessous de 1
function quantityChange(event) {
  let inputValue = event.target.value

  if (isNaN(inputValue) || inputValue <= 0) {
    event.target.value = 1
  }

  //Changement automatique du prix total du panier
  updateCartTotal()
}


function removeItemFromCard(event) {
  let button = event.target
  button.parentElement.parentElement.remove()
  updateCartTotal()
}
  


function quantityChange(event) {
  inputValue = event.target.value

  if (isNaN(inputValue) || inputValue <= 0) {
    event.target.value = 1
  }
    //Changement automatique du prix total du panier
  updateCartTotal()
}

//UpdateCartTotal
//function updateCartTotal() {
//const cartItemContainer = document.querySelector('.ligneproduit')
//const cartRows = cartItemContainer.getElementsByClassName('containerproduit2')
//let total = 0
//for (let i = 0; i < cartRows.length; i++) {
// let cartRow = cartRows[i]
//let quantityElement = cartRow.getElementsByClassName(
//   'cart-quantity'
// )[0]

//const quantity = quantityElement.value
//total = total + quantity * price
//}
//total = Math.round(total * 100) / 100
//document.querySelector('.totalprice').innerText = `€${total}`
//}