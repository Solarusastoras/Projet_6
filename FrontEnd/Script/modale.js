document.addEventListener("DOMContentLoaded", (event) => {
  afficherModale();
});

// Mise en place des éléments admin
const elementEditionMode = document.querySelector(".edition_mode");
const buttonEdition = document.querySelector(".edition");
const buttons = document.querySelectorAll("button:not(.edition)");

// Appeler afficherModale pour vérifier le token et afficher les éléments si nécessaire
function afficherModale() {
  // Utilisez la clé correcte 'data.token' pour vérifier la présence du token
  if (localStorage.getItem("data.token")) {
    // Utilisation de setProperty pour appliquer "display: block" avec !important
    if (elementEditionMode) {
      elementEditionMode.style.setProperty("display", "block", "important");
    }
    if (buttonEdition) {
      // Vérifiez si buttonEdition est bien défini
      buttonEdition.style.setProperty("display", "block", "important");
    }
    console.log("Mode édition activé");
  }
}

afficherModale();

function addImage(imageUrl) {
  const img = document.createElement("img");
  img.src = imageUrl;
  document.body.appendChild(img); // Assurez-vous que c'est le bon endroit pour ajouter votre image
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    buttons.forEach((btn) => btn.classList.remove("button-clicked"));
    this.classList.add("button-clicked");
  });
});

buttonEdition.addEventListener("click", function () {
  let overlay = document.querySelector("#overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);
    overlay.style =
      "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(128, 128, 128, 0.6); z-index: 50;";
  }

  const galerieDiv = document.createElement("div");
  galerieDiv.id = "galerie-photo";
  document.body.appendChild(galerieDiv);
  galerieDiv.style =
    "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 630px; height: 688px; background-color: white; z-index: 100;border-radius: 10px;";

  const titre = document.createElement("h3");
  titre.textContent = "Galerie photo";
  galerieDiv.appendChild(titre);
  titre.style =
    "color: black; display: flex; justify-content: center; margin: 64px 0px 50px 0px;font-size: 26px; font-weight: bold;";

  const iconeCroix = document.createElement("i");
  iconeCroix.className = "fa-solid fa-xmark";
  iconeCroix.style =
    "position: absolute; top: 30px; right: 50px; cursor: pointer; font-size: 25px;";
  iconeCroix.addEventListener("click", function () {
    galerieDiv.remove();
    overlay.remove();
  });
  galerieDiv.appendChild(iconeCroix);

  overlay.addEventListener("click", function (event) {
    // Vérifie si le clic a eu lieu sur l'overlay lui-même et non sur un enfant
    if (event.target === overlay) {
      galerieDiv.remove();
      overlay.remove();
    }
  });

  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((images) => {
      const conteneurImages = document.createElement("div");
      conteneurImages.style =
        "display: flex; flex-wrap: wrap; justify-content: left; gap: 10px; padding: 20px; magin-bottom: 20px; margin-left: 80px";
      galerieDiv.appendChild(conteneurImages);

      images.forEach((imageObj) => {
        // Crée un conteneur div pour l'image et l'icône
        const imageContainer = document.createElement("div");
        imageContainer.style = "position: relative; display: inline-block;";

        // Crée l'élément img
        const img = document.createElement("img");
        img.src = imageObj.imageUrl;
        img.style = "width: 77px; height: 103px;";

        // Crée un conteneur pour l'icône poubelle
        const iconContainer = document.createElement("div");
        iconContainer.style =
          "position: absolute; top: 6px; right: 5px; height: 17px; width: 17px; background-color: black; display: flex; justify-content: center; align-items: center; cursor: pointer;";

        // Crée l'icône de suppression
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-trash-can";
        deleteIcon.style = "color: white; font-size: 10px;";

        // Ajoute un gestionnaire d'événements pour l'icône, si nécessaire
        deleteIcon.onclick = function () {
          // Logique de suppression ici
          console.log("Suppression de l'image :", imageObj.imageUrl);
        };

        // Ajoute l'icône au conteneur de l'icône, puis le conteneur de l'icône au conteneur de l'image
        iconContainer.appendChild(deleteIcon);
        imageContainer.appendChild(img);
        imageContainer.appendChild(iconContainer);
        conteneurImages.appendChild(imageContainer);
      });

      var ligneGrises = document.createElement("div");
      ligneGrises.style =
        "width: 420px; height: 2px; background-color: #B3B3B3; margin-top: 45px; margin-bottom: 32px; margin-left: 16%";

      // Crée un bouton pour ajouter une image
      const addButton = document.createElement("button");
      addButton.textContent = "Ajouter une photo";
      // Style du bouton, ajustez selon vos besoins
      addButton.style =
        "position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); padding: 10px 20px;background-color: #1d6154; color: white";

      galerieDiv.appendChild(ligneGrises);
      // Ajoute le bouton à galerieDiv
      galerieDiv.appendChild(addButton);

      //---Modale : ajouter photo + titre et catégorie

      addButton.addEventListener("click", function () {
        // Crée une nouvelle "fenêtre" div
        const fenetreDiv = document.createElement("div");
        fenetreDiv.id = "fenetre-id"; // Donnez un ID unique
        // Style de la "fenêtre"
        fenetreDiv.style = fenetreDiv.style =
          "width: 630px; height: 680px; position: absolute; top: 1%; left: 0%; background-color: white; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);";
        const titre1 = document.createElement("h3");
        titre1.textContent = "Ajout photo";
        titre1.style =
          "text-align: center; margin-top: 67px; font-size: 28px; margin-bottom: -40px; ";
        fenetreDiv.appendChild(titre1);

        var flecheRetour = document.createElement("button");
        flecheRetour.innerHTML = '<i class="fa-solid fa-arrow-left"></i> ';
        flecheRetour.style =
          "position: absolute; top: 27px; left: 20px; cursor: pointer; font-size: 200%; border: transparent !important; color: black;";

        // Crée un nouveau div pour le carré bleu
        const carreBleu = document.createElement("div");

        // Définit le style du carré
        carreBleu.style =
          "width: 420px; height: 169px; background-color: #E8F1F6; display: flex; flexDirection: column; justifyContent: center; alignItems: center; margin: 0 auto;";

        // Crée un élément i pour l'icône
        const iconeImage = document.createElement("i");
        iconeImage.className = "fa-regular fa-image";
        iconeImage.style =
          "font-size: 500%; color: #B9C5CC; display: flex; position: relative; top:10%; left:40%";

        // Ajout d'un gestionnaire d'événements pour revenir à galerieDiv
        flecheRetour.addEventListener("click", function () {
          galerieDiv.removeChild(galerieDiv.lastChild);
        });

        // Création de l'élément input de type file
        var inputPhoto = document.createElement("input");
inputPhoto.id = "imageAjouter";
inputPhoto.type = "file";
inputPhoto.accept = "image/*";
inputPhoto.style.cssText = "z-index: 150; display: none;";

carreBleu.appendChild(inputPhoto);

// Création de l'élément img pour la prévisualisation
var previewImage = document.createElement("img");
previewImage.id = "previewImage";
previewImage.style = "display: none;"; // Cache l'image par défaut
carreBleu.appendChild(previewImage); // Ajoute l'élément img au DOM

// Ajoute l'inputPhoto directement
inputPhoto.onchange = function () {
  var file = inputPhoto.files[0]; // Obtient le fichier sélectionné
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      previewImage.src = e.target.result; // Définit la source de l'élément img
      // Assurez-vous que le conteneur parent est configuré pour centrer l'image
      carreBleu.style.display = "flex";
      carreBleu.style.marginTop = "80px";
      carreBleu.style.marginLeft = "100px"
      carreBleu.style.justifyContent = "center"; // Centre horizontalement
      carreBleu.style.alignItems = "center"; // Centre verticalement (si désiré)
      previewImage.style = "display: block; wight: 129px; height: 169px;";

      boutonAjouterPhoto.style.display = 'none';
      iconeImage.style.display = 'none';
      texteFormats.style.display = 'none';
    };
    reader.readAsDataURL(file); // Lit le fichier comme une URL de données
  }
};

        // Crée un bouton pour ajouter une photo dans carré bleu
        const boutonAjouterPhoto = document.createElement("button");
        boutonAjouterPhoto.textContent = "+ Ajouter une photo";
        boutonAjouterPhoto.style =
          "width: 173px; height: 36px; margin-top: 40px; display: flex; justify-content: center; align-items: center; margin-left: auto; margin-right: auto; position: relative; top: 20%; left: -1%; font-size: 14px; background-color: #CBD6DC;color:#306685; border: none";

        // Crée un élément p pour le texte des formats et taille max
        const texteFormats = document.createElement("p");
        texteFormats.textContent = "jpg, png : 4Mo max";
        texteFormats.style =
          "position: relative; top: 85%; left: 20%; font-size: 80%;";

        // input Titre
        var labelTitre = document.createElement("label");
        labelTitre.textContent = "Titre ";
        labelTitre.htmlFor = "inputTitre"; // Associe le label à l'input par l'ID
        labelTitre.style =
          "font-size: 16px; color: black; display: block; position:relative;; left: 15%; margin-top: 32px ;margin-bottom: 15px";

        // Corriger la création de l'input pour le titre
        var inputTitre = document.createElement("input");
        inputTitre.style.cssText =
          "width: 420px; height: 51px; position: relative;left: 15%; border: none; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);";

        // Select Catégorie

        // Création et configuration du label pour le select

        var titreCategorie = document.createElement("p");
        titreCategorie.textContent = "Catégorie";
        titreCategorie.style =
          "display:block; font-size: 16px;position:relative; left: 15%; margin-top: 32px; margin-bottom: 15px;";

        // Création du select pour les catégories
        var selectCategorie = document.createElement("select");
        selectCategorie.id = "categorie"; // Ajout de l'id pour correspondre avec le htmlFor du label

        selectCategorie.style =
          "width: 420px; height: 51px; position: relative; left: 15.5%; border: none; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);; background-color: white;";

        // Création et configuration du label pour le select
        var labelSelectCategorie = document.createElement("label");

        // Ajouter des options au select
        var categories = ["Objet", "Appartements", "Hotels & restaurants"]; // Exemple de catégories
        categories.forEach(function (categorie) {
          var option = document.createElement("option");
          option.value = categorie;
          option.textContent = categorie;
          selectCategorie.appendChild(option);
        });

        // Définition du style de la ligne grise

        var ligneGrise = document.createElement("div");
        ligneGrise.style =
          "width: 420px; height: 2px; background-color: grey; margin-top: 45px; margin-bottom: 32px; margin-left: 16%";

        // Bouton valider
        // Création du bouton Valider
        var btnValider = document.createElement("button");
        btnValider.textContent = "Valider";
        btnValider.style =
          "width: 237px; height: 36px; background-color: #A7A7A7; color: white; border: none; margin-left: 28%;";

        // Ajoutez le bouton au document dans un élément existant, par exemple 'document.body' ou un autre élément spécifique
        document.body.appendChild(btnValider); // Ajustez selon l'élément cible

        // Fonction pour vérifier l'état des champs et ajuster la couleur du bouton
        function verifierEtats() {
          if (inputTitre.value.trim() !== "" && selectCategorie.value !== "") {
            // Si les deux champs sont remplis, mettre le bouton en vert
            btnValider.style.backgroundColor = "green";
            envoyerDonnees();
          } else {
            // Sinon, remettre le bouton en gris
            btnValider.style.backgroundColor = "#A7A7A7";
          }
        }

        var inputImageUrl = document.getElementById("imageAjouter");

        // Correction de la syntaxe pour ajouter un écouteur d'événements
        btnValider.addEventListener("click", envoyerDonnees);

        function envoyerDonnees() {
          // Assurez-vous d'avoir un token valide
          var token = "data.token";

          fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Bearer ${token}`, // Utilisez le token correctement
            },
            body: JSON.stringify({
              category: categories.value,
              title: inputTitre.value, // Assurez-vous que 'inputTitre' est correctement défini
              image: Image_upload.files[0],
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `La requête a échoué avec le statut ${response.status}`
                );
              }
              return response.json();
            })
            .then((data) => {
              // Traitez la réponse ici, par exemple, afficher un message de succès
              console.log("Données envoyées avec succès :", data);
              // Vous pouvez ici réinitialiser le formulaire ou rediriger l'utilisateur
            })
            .catch((error) => {
              console.error("Erreur lors de la requête:", error);
              // Gérez l'erreur, par exemple, en affichant un message à l'utilisateur
            });
        }

        // Ajouter un écouteur d'événements pour vérifier les états à chaque frappe au clavier ou changement
        inputTitre.addEventListener("input", verifierEtats);
        selectCategorie.addEventListener("change", verifierEtats);

        // Associe un écouteur d'événements au bouton pour déclencher un clic sur l'input
        boutonAjouterPhoto.addEventListener("click", function () {
          inputPhoto.click();
        });

        // Creation d'élément dans DOM
        fenetreDiv.appendChild(flecheRetour);
        fenetreDiv.appendChild(boutonAjouterPhoto);
        carreBleu.appendChild(iconeImage);
        fenetreDiv.appendChild(carreBleu);
        carreBleu.appendChild(texteFormats);
        galerieDiv.appendChild(fenetreDiv);
        fenetreDiv.appendChild(labelTitre);
        fenetreDiv.appendChild(inputTitre);
        fenetreDiv.appendChild(titreCategorie);
        fenetreDiv.appendChild(selectCategorie);
        fenetreDiv.appendChild(ligneGrise);
        fenetreDiv.appendChild(btnValider);
      });

      // Ajoute un gestionnaire d'événements au bouton pour ajouter une image      addButton.addEventListener("click", addImage);
    })
    .catch((error) =>
      console.error("Erreur lors du chargement des images :", error)
    );

  function removeToken() {
    localStorage.removeItem("token");
  }
});
