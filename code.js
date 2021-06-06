const API = " http://localhost:3000/api/teddies";

fetch(API)
    .then((response) => response.json())
    .then((teddies) => {
        console.log(teddies);
        const container = document.querySelector(".container1");
        for (const teddy of teddies) {
            container.innerHTML += `
            <div class="carteteddy">
                <div class="contenucarteimg">
                    <img src="${teddy.imageUrl}" alt="" class="imgteddy">
                </div>

                <div class="contenuteddyname">
                    <h2 class="teddyname">${ teddy.name }</h2>
                </div>

                <p class="teddydescription">${ teddy.description }
                </p>

                <p class="teddyprice">${ (teddy.price/100).toFixed(2)} €
                </p>

               <a href="pageproduit.html?id=${teddy._id}"><p class="voirproduit">
                </p></a>
            </div>
`
        }
    })