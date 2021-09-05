API = " http://localhost:3000/api/teddies/";
const produits = JSON.parse(localStorage.getItem('produits')) || [];

var searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");



let currentTeddy

function getParameter(teddy) {
    currentTeddy = teddy
    let src = document.querySelector('.imgproduitpanier').src = `${teddy.imageUrl}`;
    let name = document.querySelector('.nameproduct');
    let description = document.querySelector('.imgdescription');

    description.innerText = `${teddy.description}`
    name.innerText = `${teddy.name}`

    let price = document.querySelector('.priceproduct');
    price.innerText = `${ (teddy.price/100).toFixed(2)} €`
}



fetch(API + id)
    .then(function (response) {
        return response.json();
    })
    .then(getParameter)
    .catch(function (error) {
        console.log(error)
    });




let btnAdd = document.querySelector('.btnajoutpanier');
btnAdd.addEventListener("click", function () {

  let image = document.querySelector('.imgproduitpanier').getAttribute('src');
  let color = document.querySelector('#color').value
  let price = parseInt(document.querySelector('.priceproduct').innerText);
  //let produits = JSON.parse(localStorage.getItem('produits')) || [];
  let name = document.querySelector('.nameproduct').innerText;
  let productIndex = produits.findIndex(function (element) {
    return element.id === id && element.color == color;
  });
  if (productIndex === -1) {
    produits.push({
      id: id + '-' + color,
      image: image,
      price: price,
      itemsPrice: price,
      name: name,
      color: color,
      count: 1
    })
  } else {
    produits[productIndex] = {
      id: id + '-' + color,
      image: image,
      price: price,
      itemsPrice: produits[productIndex].itemsPrice + price,
      color: color,
      name: name,
      count: produits[productIndex].count + 1
    }
  }


  localStorage.setItem('produits', JSON.stringify(produits))

  let msgTotal = produits.reduce(function (prev, cur) {
    return prev + cur.count;
  }, 0)


  document.querySelector('.number').innerHTML = msgTotal;
  localStorage.setItem('number', msgTotal)


  let totalPrice = 0;
  for(let i of produits) {
    totalPrice += i.itemsPrice;
  }
  localStorage.setItem('totalPrice', totalPrice)
  alert(name +" (" + color + ") a été ajouté au panier !");
});


document.querySelector('.number').innerHTML = localStorage.getItem('number') || 0;
