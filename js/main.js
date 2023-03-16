// variable utile pour l'ordre des bulles à remplir
let ordreCouleur = 0;
// variable utile pour l'ordre des indices sur le côté
let ordreToast = 0;
// variable 0 ou 1 pour une ligne finie
let ligneFini = 0;

let nbEssais = 0;
let statut = "";

let date = new Date(); // crée un objet Date avec la date actuelle
let jour = date.getDate(); // retourne le jour du mois (1-31)
let mois = date.getMonth()+1; // retourne le mois (1-12)
let annee = date.getFullYear();
date_score = jour+"/"+mois+"/"+annee;

let scores = JSON.parse(localStorage.getItem("score")) || [];

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
        game.insertAdjacentHTML("afterbegin","<div class='ligne'><div class='bulle'></div><div class='bulle'></div><div class='bulle'></div><div class='bulle'></div><div class='toast' id='toast'><div class='bulle_indice'></div><div class='bulle_indice'></div><div class='bulle_indice'></div><div class='bulle_indice'></div></div></div>");
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
    const bulleColor = document.getElementsByClassName('bulle'),
        toast = document.getElementsByClassName('toast');

    // récupère la difficulté stockée
    let laDifficulte = localStorage.getItem("laDifficulte");

    let nbrBulle = bulleColor.length;
    bulleColor[ordreCouleur].style.backgroundColor = color;

    ordreCouleur++;
    ligneFini++;

    ligneColor.push(color);

    if (nbrBulle == ordreCouleur) {
        document.body.innerHTML += "<div class='win'><h1>Game Over</h1><p>Solution :</p><div class='ligne_reponse'><div style='background:"+couleur_random[0]+"' class='bulle'></div><div style='background:"+couleur_random[1]+"' class='bulle'></div><div style='background:"+couleur_random[2]+"' class='bulle'></div><div style='background:"+couleur_random[3]+"' class='bulle'></div></div><img class='gif' src='./assets/loose.gif'><a onclick='reload()'>Rejouer</a></div>";
        tabScore(date_score, nbEssais, laDifficulte, "Perdu");
    }

    if (ligneFini == 4) {
        if (JSON.stringify(couleur_random) === JSON.stringify(ligneColor)) {
            document.body.innerHTML += "<div class='win'><h1>Félicitations !!</h1><img class='gif' src='./assets/win.gif'><a onclick='reload()'>Rejouer</a></div>";
            tabScore(date_score, nbEssais, laDifficulte, "Gagné");
        }
        else {

            // mettre à jour les bulles d'indice en conséquence            
            for(let i = 0; i < toast.length; i++){
                if (i === ordreToast) {
                  // vérifier pour des places correctes
                  for(let j = 0; j < 4; j++){
                      if(ligneColor[j]===couleur_random[j]) {
                          toast[i].getElementsByClassName('bulle_indice')[j].style.backgroundColor = 'green';
                      } else {
                          toast[i].getElementsByClassName('bulle_indice')[j].style.backgroundColor = 'white';
                      }
                  }
              
                  toast[i].classList.add('score_on');
                } 
              }

            toast[ordreToast].classList.add('score_on');
            ordreToast++
            ligneFini = 0;
            ligneColor.splice(color);
        }
        nbEssais++;
    }

    localStorage.setItem('score', date_score, nbEssais, laDifficulte, statut);
}

function tabScore(date_score, nbEssais, laDifficulte, statut) {
    scores.push({
        date_score: date_score,
        nbEssais: nbEssais,
        laDifficulte : laDifficulte,
        statut: statut
    });
    localStorage.setItem("score", JSON.stringify(scores));
    insertScore();
}

function insertScore() {
    const scores = JSON.parse(localStorage.getItem("score"));
    const tableau = document.getElementById('tabScore');
    for (let i=0; i < scores.length; i++) {
        tableau.insertAdjacentHTML("beforeend", "<div class='ligne_score'><div class='case'>"+scores[i].date_score+"</div><div class='case'>"+scores[i].nbEssais+"</div><div class='case'>"+scores[i].laDifficulte+"</div><div class='case'>"+scores[i].statut+"</div></div>");
    }
}

function reload() {
    location.reload();
}