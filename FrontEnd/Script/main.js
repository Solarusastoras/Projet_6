// Déclaration d'un tableau vide pour stocker les données de travaux
let worksData = [];
let currentFilter = "0";


// Fonction pour ajouter des données de travaux et appliquer le filtre actuel
function addWorkData(newWork) {
  worksData.push(newWork); // Ajoute les nouvelles données au tableau
  applyFilter();

}

// Fonction pour appliquer le filtre actuel et afficher les données filtrées
function applyFilter() {
  let filteredData;
  if (currentFilter == "0") {
    filteredData = worksData.filter(work => work.categoryId >= 1 && work.categoryId <= 3);
  } else {
    filteredData = worksData.filter(work => work.categoryId == currentFilter);
  }
  displayData(filteredData); // Rafraîchit l'affichage avec les données filtrées
}

// Gestion du chargement initial des données et de l'interaction avec les boutons
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    worksData = data;
    applyFilter(); // Applique le filtre dès le chargement initial des données
  } catch (error) {
    console.error("Erreur lors de la récupération des données de travaux:", error);
  }

  const buttons = document.querySelectorAll("button:not(.edition)");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(btn => btn.classList.remove("button-clicked"));
      this.classList.add("button-clicked");
      currentFilter = this.getAttribute("data-filter"); // Mise à jour du filtre actuel
      applyFilter(); // Applique le filtre actuel
    });
  });
});

// Fonction pour afficher les données
function displayData(data) {
  const dataContainer = document.getElementById("dataContainer");
  dataContainer.innerHTML = ""; // Vidage du conteneur

  // Création d'un tableau pour stocker les ID
  const workIds = [];

  data.forEach(item => {
    // Ajout de l'ID du travail au tableau
    workIds.push(item.id);

    // Création d'un conteneur <figure> pour chaque travail
    const figure = document.createElement("figure");
    figure.classList.add("work-item"); // Ajout d'une classe pour le style (optionnel)

    // Création et ajout de l'image
    const newImage = document.createElement("img");
    newImage.src = item.imageUrl; // Attribution de l'URL de l'image
    figure.appendChild(newImage);

    // Création et ajout du <figcaption>
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = item.title; // Utiliser item.title ou une autre propriété appropriée
    figure.appendChild(figcaption);

    // Ajout du <figure> au conteneur principal
    dataContainer.appendChild(figure);
  });

  console.log(workIds);
}