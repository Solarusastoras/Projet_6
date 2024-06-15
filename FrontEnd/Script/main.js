// Déclaration d'un tableau vide pour stocker les données de travaux
let worksData = [];

// Ajout d'un écouteur d'événement qui se déclenche lorsque le document HTML est complètement chargé
document.addEventListener("DOMContentLoaded", function () {
  // Appel à l'API pour récupérer les données de travaux
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json()) // Conversion de la réponse en JSON
    .then((data) => {
      worksData = data; // Stockage des données dans le tableau worksData

      // Sélection de tous les boutons du document
      const buttons = document.querySelectorAll("button");
      // Ajout d'un écouteur d'événement à chaque bouton
      buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          // Suppression de la classe "button-clicked" de tous les boutons
          buttons.forEach(function (btn) {
            btn.classList.remove("button-clicked");
          });
          // Ajout de la classe "button-clicked" au bouton cliqué
          this.classList.add("button-clicked");

          // Récupération de la valeur de l'attribut "data-filter" du bouton cliqué
          const filterValue = this.getAttribute("data-filter");

          let filteredData;
          // Si la valeur du filtre est "0", on filtre les données pour ne garder que celles dont l'ID de catégorie est entre 1 et 3
          if (filterValue == "0") {
            filteredData = worksData.filter(
              (work) => work.categoryId >= 1 && work.categoryId <= 3
            );
          } else {
            // Sinon, on filtre les données pour ne garder que celles dont l'ID de catégorie correspond à la valeur du filtre
            filteredData = worksData.filter(
              (work) => work.categoryId == filterValue
            );
          }

          // Affichage des données filtrées
          displayData(filteredData);
        });
      });
    });
});

// Fonction pour afficher les données
function displayData(data) {
  // Sélection du conteneur de données
  const dataContainer = document.getElementById("dataContainer");
  // Vidage du conteneur
  dataContainer.innerHTML = "";

  // Pour chaque élément de données
  data.forEach((item) => {
    // Création d'une nouvelle image
    const newImage = document.createElement("img");
    // Attribution de l'URL de l'image à l'attribut src de l'image
    newImage.src = item.imageUrl;
    // Affichage de l'image dans la console
    console.log(newImage);
    // Ajout de l'image au conteneur de données
    dataContainer.appendChild(newImage);
  });
}