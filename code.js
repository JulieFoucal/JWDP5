const API = " http://localhost:3000/api/teddies";

fetch(API)
    .then((response) => response.json())
    .then((teddies) => {
        console.log(teddies);
        const container = document.querySelector(".container");
        for (const teddy of teddies) {
            container.innerHTML += `
<div class="card">
<img src="${teddy.imageUrl}" alt="" class="imagesours">
<div class="caption">
<div class"nom">${ teddy.name }</div> 
<div class"blabla">${ teddy.description }</div>
<div class"prix">${ (teddy.price/100).toFixed(2)} €</div>
</div>
<a href="produit.html?id=${teddy._id}" class="voir">Voir le produit</a>
</div>`
        }
    })