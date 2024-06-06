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

// Affiche les données (filtrées ou non)
function displayData(data) {
    const container = document.getElementById('works-container');
    container.innerHTML = ''; // Efface les anciennes données affichées

    data.forEach(work => {
        // Création et ajout des éléments au DOM comme montré précédemment
    });
}

// Filtre et affiche les données basées sur la catégorie
function filterData(categoryId) {
    const filteredData = window.allData.filter(work => work.categoryId === categoryId);
    displayData(filteredData);
}

// Configuration des écouteurs d'événements pour les boutons de filtre

const buttonObjet = document.querySelector(".btn_objet");
buttonObjet.addEventListener("click", function(){
    // mettre fonction


});