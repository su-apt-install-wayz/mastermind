// variable utile pour l'ordre des bulles à remplir
let ordreCouleur = 0;
// variable utile pour l'ordre des indices sur le côté
let ordreToast = 0;
// variable 0 ou 1 pour une ligne finie
let ligneFini = 0;

// tableaux vides pour les couleurs et pour une ligne de couleur afin de les comparer
let couleur_random = [];
const ligneColor = [];

// fonction qui permet de récupérer la difficulté et la stocker, puis changer de page
function getDifficulte(difficulte) {
    localStorage.setItem('laDifficulte', difficulte);
    window.location.href = "jeu.html";
}

// fonction qui permet de créer les lignes en fonction de la difficulté
function ligneBoucle() {
    const game = document.getElementById('game');

    // récupère la difficulté stockée
    let laDifficulte = localStorage.getItem("laDifficulte");

    //définit le nombre de lignes en fonction de la difficulté
    nbLigne = 0;
    switch(laDifficulte) {
        case 'facile':
            nbLigne = 8;
            break;

        case 'moyen':
            nbLigne = 5;
            break;
                
        case 'difficile':
            nbLigne = 3;
            break;
    }

    // crée les lignes par rapport au nombre de lignes
    for (var i = 1; i <= nbLigne; i++) {
        game.insertAdjacentHTML("afterbegin","<div class='ligne'><div class='bulle'></div><div class='bulle'></div><div class='bulle'></div><div class='bulle'></div><div class='toast' id='toast'>2</div></div>");
    }
}
    
// choisit aléatoirement 4 chiffres, ceux-ci correspondent à un code pour avoir la couleur
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
    // met les 4 couleurs choisies aléatoirement dans le tableau
    couleur_random.push(colorBulle);
}

console.log(couleur_random);


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
            document.body.innerHTML += "<div class='win'><h1>Félicitations !!</h1><a onclick='reload()'>Rejouer</a></div>";
        }
        else {
            ligneFini = 0;
            ligneColor.splice(color);
            toast[ordreToast].classList.add('score_on');
            ordreToast++;
        }
    }
}

function reload() {
    location.reload();
}