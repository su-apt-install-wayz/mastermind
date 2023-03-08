let tableau1 = ['red', 'blue', 'green'];
let tableau2 = ['red', 'green', 'green'];

// comparer les deux tableaux et identifier les éléments bien placés
let bonPlacement = [];

for(let i = 0; i < tableau1.length; i++){
  if(tableau1[i] === tableau2[i]){
    bonPlacement.push(true);
  } else {
    bonPlacement.push(false);
  }
}

// mettre à jour les bulles d'indice en conséquence
let bullesIndice = document.querySelectorAll('.bulle_indice');

for(let i = 0; i < bullesIndice.length; i++){
  if(bonPlacement[i]) {
    bullesIndice[i].style.backgroundColor = 'red';
  } else {
    bullesIndice[i].style.backgroundColor = 'white';
  }
}