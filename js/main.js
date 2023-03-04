let ordreCouleur = 0;
let ordreToast = 0;
let ligneFini = 0;

let couleur_random = [];
const ligneColor = [];
    
for (let i = 0; i < 4; i++) {
    color = Math.floor(Math.random() * 5) + 1;

    switch(color) {
        case 1:
            colorBulle = "red";
            break;

        case 2:
            colorBulle = "yellow";
            break;
               
        case 3:
            colorBulle = "green";
            break;
             
        case 4:
            colorBulle = "blue";
            break;
           
        case 5:
            colorBulle = "white";
            break;
    }
    couleur_random.push(colorBulle);
}

console.log(couleur_random);

function reload() {
    location.reload();
}


function getColors(color) {
    const bulleColor = document.getElementsByClassName('bulle');

    const toast = document.getElementsByClassName('toast');
    console.log(color);
    let nbrBulle = bulleColor.length;
    bulleColor[ordreCouleur].style.backgroundColor = color;

    ordreCouleur++;
    ligneFini++;

    ligneColor.push(color);

    if (nbrBulle == ordreCouleur) {
        document.body.innerHTML += "<div class='win'><h1>Game Over</h1><br><a onclick='reload()'>Rejouer</a></div>";
    }

    if (ligneFini == 4) {
        if (JSON.stringify(couleur_random) === JSON.stringify(ligneColor)) {
            document.body.innerHTML += "<div class='win'><h1>Félicitations !!</h1><a href'#'>Rejouer</a></div>";
        }
        else {
            ligneFini = 0;
            ligneColor.splice(color);
            toast[ordreToast].classList.add('score_on');
            ordreToast++;
        }
    }
}