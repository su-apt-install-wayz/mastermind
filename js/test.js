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