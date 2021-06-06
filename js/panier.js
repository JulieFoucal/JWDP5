const panier = JSON.parse(localStorage.getItem('panier')) || [];

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
  
    const quantityInputs = document.querySelectorAll('.cart-quantity')
    quantityInputs.forEach((input) => {
      input.addEventListener('change', quantityChange)
    })
    
  
    const purchaseBtn = document.querySelector('.btn-commander')
    purchaseBtn.addEventListener('click', purchase)
  }

  function removeItemFromCard(event) {
    let button = event.target
    button.parentElement.parentElement.remove()
    updateCartTotal()
  }

  function quantityChange(event) {
    let inputValue = event.target.value
  
    if (isNaN(inputValue) || inputValue <= 0) {
      event.target.value = 1
    }
    updateCartTotal()
  }

  function updateCartTotal() {
    const cartItemContainer = document.querySelector('.ligneproduit')
    const cartRows = cartItemContainer.getElementsByClassName('.ligneproduit')
    let total = 0
  
    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i]
      let priceElement = cartRow.querySelectorAll('.prixproduitpanier')[0]
      let quantityElement = cartRow.getElementsByClassName(
        'cart-quantity'
      )[0]
  
      const quantity = quantityElement.value
      total = total + quantity * price
    }
    total = Math.round(total * 100) / 100
    document.querySelector('.totalprice').innerText = `€${total}`
  }