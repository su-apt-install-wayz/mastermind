function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

document.addEventListener('DOMContentLoaded', function () {
    // generate stars
    var starElements = document.querySelectorAll('.star');
    
    starElements.forEach(function (starElement) {
        starElement.classList.add('star--' + (getRandomInt(2) + 1));
        starElement.style.top = getRandomInt(100) + '%';
        starElement.style.left = getRandomInt(100) + '%';
    });
});
