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
let annee = date.getFullYear(); // retourne l'année
date_score = jour+"/"+mois+"/"+annee;

// initialiser le tableau scores à vide s'il n'existe pas
let scores = JSON.parse(localStorage.getItem('score')) || [];

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


function getColors(color) {
    const bulleColor = document.getElementsByClassName('bulle'),
        toast = document.getElementsByClassName('toast');
    const game = document.getElementById('game');

    // récupère la difficulté stockée
    let laDifficulte = localStorage.getItem("laDifficulte");

    let nbrBulle = bulleColor.length;
    bulleColor[ordreCouleur].style.backgroundColor = color;

    ordreCouleur++;
    ligneFini++;

    ligneColor.push(color);

    // si le jeu est fini ou si les deux tableaux ne correspondent pas, le joueur a perdu
    if (nbrBulle == ordreCouleur && JSON.stringify(couleur_random) !== JSON.stringify(ligneColor)) {
        document.body.innerHTML += "<div class='win'><h1>Game Over</h1><div class='ligne_reponse'><div style='background:"+couleur_random[0]+"' class='bulle'></div><div style='background:"+couleur_random[1]+"' class='bulle'></div><div style='background:"+couleur_random[2]+"' class='bulle'></div><div style='background:"+couleur_random[3]+"' class='bulle'></div></div><img class='gif' src='./ressources/loose.gif'><a onclick='reload()'>Rejouer</a></div>";
        tabScore(date_score, "--", laDifficulte, "Perdu");
    }

    // à chaque fin de ligne, donc dès qu'il y a 4 bulles remplies
    if (ligneFini == 4) {
        // si les deux tableaux correspondent -> gagné
        if (JSON.stringify(couleur_random) === JSON.stringify(ligneColor)) {
            document.body.innerHTML += "<div class='win'><h1>Félicitations !!</h1><img class='gif' src='./ressources/win.gif'><a onclick='reload()'>Rejouer</a></div>";
            // permet de faire le tableau des scores
            tabScore(date_score, nbEssais+1, laDifficulte, "Gagné");
        }
        else {

            // mettre à jour les bulles d'indice en conséquence            
            for(let i = 0; i < toast.length; i++){
                if (i === ordreToast) {
                  // vérifier pour des places correctes
                  for(let j = 0; j < 4; j++){
                      if(ligneColor[j]===couleur_random[j]) {
                        // mettre en vert si une couleur est bien placée
                          toast[i].getElementsByClassName('bulle_indice')[j].style.backgroundColor = 'green';
                        // sinon blanc
                      } else {
                          toast[i].getElementsByClassName('bulle_indice')[j].style.backgroundColor = 'white';
                      }
                  }
                  // ajoute une classe qui permet d'afficher les indices sur le côté de la ligne
                  toast[i].classList.add('score_on');
                  game.classList.add('active');
                } 
            }

            toast[ordreToast].classList.add('score_on');
            // pouvoir passer aux indices de la ligne suivante
            ordreToast++
            // définir à 0 la ligne pour pouvoir revérifier à chaque fin de ligne (=4)
            ligneFini = 0;
            // vider le tableau des propositions du joueur
            ligneColor.splice(color);
        }
        nbEssais++;
    }
}

// permet de mettre dans un tableau toutes les infos pour le tableau des scores
function tabScore(date_score, nbEssais, laDifficulte, statut) {
    scores.push({
        date_score: date_score,
        nbEssais: nbEssais,
        laDifficulte : laDifficulte,
        statut: statut
    });
    // le stocker en local sur le navigateur
    localStorage.setItem("score", JSON.stringify(scores));
}

// permet d'insérer le tableau dans la page du tableau des scores
function insertScore() {
    const tableau = document.getElementById('tabScore');
    
    for (let i=0; i < scores.length; i++) {
        tableau.insertAdjacentHTML("beforeend", "<div class='ligne_score'><div class='case'>"+scores[i].date_score+"</div><div class='case'>"+scores[i].nbEssais+"</div><div class='case'>"+scores[i].laDifficulte+"</div><div class='case'>"+scores[i].statut+"</div></div>");
    }
}

// pour recharger la page, elle intervient sur les boutons "rejouer"
function reload() {
    location.reload();
}