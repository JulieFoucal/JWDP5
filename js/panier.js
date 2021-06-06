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

  