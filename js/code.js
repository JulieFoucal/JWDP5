const API = " http://localhost:3000/api/teddies";

fetch(API)
    .then((response) => response.json())
    .then((teddies) => {
        console.log(teddies);
        const container = document.querySelector(".ficheproduits");
        for (const teddy of teddies) {
            container.innerHTML += `

            <div class="carte">
            <div class="imgcontainer">
                <img src="${teddy.imageUrl}" alt="teddy1" class="imgteddy">
            </div>

            <div class="imgtitre">
                <h3 class="titleimg">${ teddy.name }</h3>
                <h3 class="prodprice">${ (teddy.price/100).toFixed(2)} €</h3>
            </div>

            <div class="imgdescription">${ teddy.description }</div>

            <div class="voirproduit">
<a href="pageproduit.html?id=${teddy._id}" class="linkproduit">Voir le produit</a>
</div>
</div>
`
        }
    })