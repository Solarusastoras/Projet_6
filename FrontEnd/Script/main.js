// Récupération et affichage des données des projets serveur
function init() {
    console.log("Initialisation");

    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            window.allData = data; // Stocke toutes les données pour un accès global
            displayData(data); // Affiche toutes les données par défaut
        });
}
init();

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button'); // Sélectionne tous les boutons
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Retire la classe .button-clicked de tous les boutons
            buttons.forEach(function(btn) {
                btn.classList.remove('button-clicked');
            });
            // Ajoute la classe .button-clicked uniquement au bouton cliqué
            this.classList.add('button-clicked');
        });
    });
});



