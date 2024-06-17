function afficherModale() {
  // Logique pour afficher la modale
  console.log("Affichage de la modale pour l'utilisateur connecté.");
}

// Sélectionne tous les boutons sauf ceux ayant la classe 'edition'
const buttons = document.querySelectorAll("button:not(.edition)");

// Ajout d'un écouteur d'événement à chaque bouton sélectionné
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Suppression de la classe "button-clicked" de tous les boutons sélectionnés
    buttons.forEach(function (btn) {
      btn.classList.remove("button-clicked");
    });
    // Ajout de la classe "button-clicked" au bouton cliqué
    this.classList.add("button-clicked");
  });
});

var elementEditionMode = document.querySelector(".edition_mode");
elementEditionMode.style.display = "block";

var elementEditionModebis = document.querySelector(".edition_mode_bis");
elementEditionModebis.style.display = "flex";

let edition = document.querySelectorAll(".edition");
// Définir buttonEdition en sélectionnant le bouton d'édition
let buttonEdition = document.querySelector("#edition");

buttonEdition.addEventListener("click", function () {
  // Vérifier si l'overlay existe déjà
  let overlay = document.querySelector("#overlay");
  if (!overlay) {
    // Créer l'overlay s'il n'existe pas
    overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);

    // Appliquer le style à l'overlay pour qu'il couvre tout l'écran
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(128, 128, 128, 0.6)";
    overlay.style.zIndex = "50";
  }
  // Créer un div pour la galerie photo
  const galerieDiv = document.createElement("div");
  galerieDiv.id = "galerie-photo";
  document.body.appendChild(galerieDiv);

  // Appliquer le style au div de la galerie
  galerieDiv.style.position = "fixed"; // Position fixe pour rester au-dessus de l'overlay
  galerieDiv.style.top = "50%";
  galerieDiv.style.left = "50%";
  galerieDiv.style.transform = "translate(-50%, -50%)"; // Centrer la galerie
  galerieDiv.style.width = "630px";
  galerieDiv.style.height = "680px";
  galerieDiv.style.backgroundColor = "white"; // Couleur de fond blanche
  galerieDiv.style.zIndex = "100"; // S'assurer qu'elle est au-dessus de l'overlay
  galerieDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Ajouter une ombre pour mieux la distinguer

  // Ajouter un titre à la galerie
  const titre = document.createElement("h3");
  titre.textContent = "Galerie photo";
  galerieDiv.appendChild(titre);
  titre.style.color = "black";
  titre.style.display = "flex";
  titre.style.justifyContent = "center";
  titre.style.margin = "64px 0px 50px 0px"
  
  // Créer un élément pour l'icône
const iconeCroix = document.createElement("i");
iconeCroix.className = "fa-solid fa-xmark";
iconeCroix.style.position = "absolute";
iconeCroix.style.top = "10px";
iconeCroix.style.right = "10px";
iconeCroix.style.cursor = "pointer";
iconeCroix.style.fontSize = "20px";

  // Affichage des photos
  function chargerEtAfficherPhotos() {
    fetch('http://localhost:5678/api/works')
      .then(response => response.json()) // Convertir la réponse en JSON
      .then(data => {
        data.forEach(photo => {
          const img = document.createElement("img");
          img.src = photo.url; // Assurez-vous que la réponse de l'API contient une clé 'url'
          img.style.width = "100%"; // Ajustez selon le besoin
          img.style.marginBottom = "20px"; // Ajustez selon le besoin
          conteneurImages.appendChild(img); // Assurez-vous que 'conteneurImages' est bien défini et accessible
        });
      })
      .catch(error => console.error("Erreur lors du chargement des photos:", error));
  }
  
  // Appeler la fonction pour charger et afficher les photos
  chargerEtAfficherPhotos();



// Ajouter un écouteur d'événements pour enlever galerieDiv lorsque l'icône est cliquée
iconeCroix.addEventListener("click", function() {
  galerieDiv.remove();
  overlay.remove(); 
});

// Ajouter l'icône à galerieDiv
galerieDiv.appendChild(iconeCroix);

});




// Déconnexion
function removeToken() {
  localStorage.removeItem("token");
}
window.addEventListener("unload", removeToken);
