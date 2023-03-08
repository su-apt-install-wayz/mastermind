let bonPlacement = [];
for(let i = 0; i < couleur_random.length; i++){
    if(couleur_random[i] === ligneColor[i]){
        bonPlacement.push(couleur_random[i]);
    } else {
        bonPlacement.push(color);
    }
}

// mettre à jour les bulles d'indice en conséquence
let bullesIndice = document.getElementsByClassName('bulle_indice');
let ligneFini = true; // Initialiser la variable ici

for(let i = 0; i < bullesIndice.length; i++){
    const isBonPlacement = (bonPlacement[i]===couleur_random[i]);
    
    if(isBonPlacement) {
        bullesIndice[i].style.backgroundColor = 'red';
    } else {
        bullesIndice[i].style.backgroundColor = 'white';
        
        // Si une seule des bulles d'indice est blanche, la ligne n'est pas terminée
        ligneFini = false;
    }
}

if (ligneFini) {
    // Code à exécuter si la ligne est terminée
    console.log('Ligne terminée!');
    
    // Réinitialisation des variables
    ligneFini = false;
    ligneColor = []; // Attention: la variable s'appelle ligneColor, donc pas besoin de l'argument color dans splice() 
    colorIndex = 0;
} else {
    // Code à exécuter si la ligne n'est pas encore terminée
    console.log('Ligne non terminée');
}