API = " http://localhost:3000/api/teddies/";
const panier = JSON.parse(localStorage.getItem('panier')) || [];

var searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

console.log(id);

let currentTeddy

function getParameter(teddy) {
    currentTeddy = teddy
    let src = document.querySelector('.imagesproduits').src = `${teddy.imageUrl}`;
    let name = document.querySelector('.nameproduct');
    let description = document.querySelector('.description');

    description.innerText = `${teddy.description}`
    name.innerText = `${teddy.name}`

    let price = document.querySelector('.priceproduct');
    price.innerText = `${ (teddy.price/100).toFixed(2)} €`
    console.log(src);
    console.log(teddy);
    console.log(description)

    const boutonajout = document.getElementById('boutonajout');
    boutonajout.addEventListener('click', function () {
        console.log('click');

        ajoutAuPanier();

    })
}


fetch(API + id)
    .then(function (response) {
        return response.json();
    })
    .then(getParameter)
    .catch(function (error) {
        console.log(error)
    });



function ajoutAuPanier() {
    const colorTag = document.getElementById('color');
    const addTeddy = {
        _id: currentTeddy._id,
        name: currentTeddy.name,
        price: currentTeddy.price,
        color: colorTag.value,
        quantity: 1
    }
    
    panier.push(addTeddy);
    localStorage.setItem('panier', JSON.stringify(panier))
}

/*
      bouton.onclick = Ajoutaupanier;
}*/



/*
        const teddy = {
            _id: '5be9c8541c9d440000665243',
            name: '.nameproduct',
            description: '.description',
            price: '.priceproduct',
            colors: ['color']
        };


        

        panier.push(addTeddy); localStorage.setItem('panier', JSON.stringify(panier))
*/