if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  const removeBoutons = document.querySelectorAll('.btn-remove')
  removeBoutons.forEach((btn) => {
    btn.addEventListener('click', removeItemFromCard)
  })

  const quantityInputs = document.querySelectorAll('.cart-quantity-input')
  quantityInputs.forEach((input) => {
    input.addEventListener('change', quantityChange)
  })
  $
  const addToCardBtns = document.querySelectorAll('.shop-item-button')
  addToCardBtns.forEach((btn) => {
    btn.addEventListener('click', addToCart)
  })

  const purchaseBtn = document.querySelector('.btn-achat')
  purchaseBtn.addEventListener('click', purchase)
}

//Purchase
function purchase() {
  const contenuPanier = document.querySelector('.bloc')

  if (!contenuPanier.hasChildNodes()) {
    return alert('Vous panier est vide')
  }

  while (contenuPanier.hasChildNodes()) {
    contenuPanier.removeChild(contenuPanier.firstChild)
  }

  updateCartTotal()
  alert("Merci d'avoir passsé commande")
}

//AddToCart
function addToCart(event) {
  const button = event.target
  const imageUrl =
    button.parentElement.parentElement.querySelector('.panierimage').src
  const title =
    button.parentElement.parentElement.querySelector(
      '.bloc'
    ).innerText
  const price = button.parentElement.querySelector('.panierprice').innerText
  const contenuPanier = document.querySelector('.cart-items')

  //CheckNames
  const cartItemNames = itemsContainer.querySelectorAll('.prices')
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      return alert('Ce produit est déjà dans votre panier')
    }
  }

  //ADD new item
  const newItem = document.createElement('div')
  newItem.classList.add('bloc')
  contenuPanier.append(newItem)
  newItem.innerHTML = `
  <div class="bloc">
<div class="panierimage">
    <img class="imagesproduits2" src="${teddy.imageUrl}">
</div>
<div class="panierprice">
    <p class="prices">${ (teddy.price/100).toFixed(2)}</p>
</div>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1" />
    <button class="btn btn-remove" type="button">ENLEVER DU PANIER</button>
  </div>
</div>
  `

  newItem
    .querySelector('.btn-remove')
    .addEventListener('click', removeItemFromCard)

  newItem
    .querySelector('.cart-quantity-input')
    .addEventListener('change', quantityChange)

  //
  updateCartTotal()

  alert('Vous avez ajouté ce produit dans votre panier')
}

//Remove
function removeItemFromCard(event) {
  let button = event.target
  button.parentElement.parentElement.remove()
  updateCartTotal()
}

//quantityChange
function quantityChange(event) {
  let inputValue = event.target.value

  if (isNaN(inputValue) || inputValue <= 0) {
    event.target.value = 1
  }
  updateCartTotal()
}

//UpdateCartTotal
function updateCartTotal() {
  const cartItemContainer = document.querySelector('.bloc')
  const cartRows = cartItemContainer.getElementsByClassName('bloc')
  let total = 0

  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i]
    let priceElement = cartRow.querySelectorAll('.prices')[0]
    let quantityElement = cartRow.getElementsByClassName(
      'cart-quantity-input'
    )[0]

    const price = parseFloat(priceElement.innerText.replace('$', ''))
    const quantity = quantityElement.value
    total = total + quantity * price
  }
  total = Math.round(total * 100) / 100
  document.querySelector('.cart-total-price').innerText = `€${total}`
}