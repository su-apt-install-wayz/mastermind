let tableau1 = ["a", "b", "c", "d"]
let tableau2 = ["a", "b", "3", "4"]

let nbPlace = 0

if (tableau1[0] === tableau2[0]) {
    console.log('ok premier element')
    nbPlace++
}

if (tableau1[1] === tableau2[1]) {
    console.log('ok second element')
    nbPlace++
}

if (tableau1[2] === tableau2[2]) {
    console.log('ok 3element')
    nbPlace++
}

if (tableau1[3] === tableau2[3]) {
    console.log('ok 4element')
    nbPlace++
}

console.log('nb : '+nbPlace)


switch(nbPlace) {
    
}

function compareTableaux(tableau1, tableau2) {
    // Vérifiez que les deux tableaux ont la même longueur
    if (tableau1.length !== tableau2.length) {
      return false;
    }
  
    // Parcourez chaque élément et comparez-les à chaque index
    for (let i = 0; i < tableau1.length; i++) {
      if (tableau1[i] !== tableau2[i]) {
        return false;
      }
    }
  
    // Si tous les éléments correspondent, retourner vrai
    return true;
  }
  
  // Exemple d'utilisation :
  const tableauA = [1, 2, 3];
  const tableauB = [1, 2, 4];
  console.log(compareTableaux(tableauA, tableauB)); // Renvoie false
  