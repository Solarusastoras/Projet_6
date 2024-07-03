// Creation banniere edition
// Création de la div pour le mode édition
var divEditionMode = document.createElement("div");
divEditionMode.classList.add("edition_mod");

// Création de l'icône
var icon = document.createElement("i");
icon.className = "fa-regular fa-pen-to-square";
divEditionMode.appendChild(icon);
divEditionMode.classList.add("div_edition-mode");
divEditionMode.append(" mode édition");

var header = document.querySelector("header");
// Insérer la div avant le header
document.body.insertBefore(divEditionMode, header);

// button pour ouvrir Modale
const spanProjets = document.querySelector("h2 > .projets");
// Remonter au parent <h2>
const h2MesProjets = spanProjets.parentNode;

// Créer le bouton
const button = document.createElement("button");
button.className = "edition";

// Ajouter l'icône au bouton
const iconBis = document.createElement("i");
iconBis.id = "editionIcon";
iconBis.className = "marge_gauche -- fa-regular fa-pen-to-square";
button.appendChild(iconBis);

// Ajouter du texte au bouton
button.appendChild(document.createTextNode("modifier"));

// Insérer le bouton dans le DOM juste après l'élément <h2> ciblé
h2MesProjets.insertAdjacentElement("afterend", button);
var divEditionMode = document.createElement("div");
divEditionMode.classList.add("edition_mod");
const buttonEdition = document.querySelector(".edition");
const boutonConnexion = document.querySelector(".loginButton");
var lienLogin = document.querySelector("span");

function stockerToken(token) {
  if (token) {
    localStorage.setItem("token", token);
    return true; // Indique que le token a été stocké
  }
  return false;
}

function tokenEstInvalide() {
  const token = localStorage.getItem("token");
  return token && token.length === 0; // Vérifie si le token est non nul et non vide
}

function utilisateurNonConnecte() {
  if (tokenEstInvalide()) {
    divEditionMode.style.display = "none";
    iconBis.style.display = "none";
    iconBis.style.color = "transparent";
    console.error("Token non reçu ou invalide.");
  } else {
    divEditionMode.style.display = "block";
    iconBis.style.display = "block";
    iconBis.style.color = "black";
  }
}

// Mise en place des éléments admin
const elementEditionMode = document.querySelector(".edition_mode");
const buttons = document.querySelectorAll("button:not(.edition)");
const storedData = localStorage.getItem("worksData");

function loadWorksData() {
  const storedData = localStorage.getItem("worksData");
  if (storedData) {
    const worksData = JSON.parse(storedData);
    const ids = worksData.map((works) => id);
    console.log("IDs récupérés:", ids);
    // Vous pouvez maintenant utiliser les ids pour d'autres opérations
  } else {
    console.error("Aucune donnée de travaux trouvée dans localStorage.");
  }
}

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
  }

  //--------------–--------------------------------------------
  //----------------    Modale n1   -------------------------
  //--------------–--------------------------------------------

  const galerieDiv = document.createElement("div");
  galerieDiv.id = "galerie-photo";
  document.body.appendChild(galerieDiv);

  const titre = document.createElement("h3");
  titre.textContent = "Galerie photo";
  titre.classList.add("titre_galerie");
  galerieDiv.appendChild(titre);

  const iconeCroix = document.createElement("i");
  iconeCroix.className = "fa-solid fa-xmark";
  iconeCroix.addEventListener("click", function () {
    galerieDiv.remove();
    overlay.remove();
  });
  galerieDiv.appendChild(iconeCroix);

  overlay.addEventListener("click", function (event) {
    // check si le clic a eu lieu sur l'overlay
    if (event.target === overlay) {
      galerieDiv.remove();
      overlay.remove();
    }
  });

  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((images) => {
      const conteneurImages = document.createElement("div");
      conteneurImages.className = "conteneur-images";
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
        iconContainer.className = "icon_container";

        // Crée l'icône de suppression
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-trash-can";
        deleteIcon.style = "color: white; font-size: 10px;";

        // Supprimer un projet cicle
        deleteIcon.addEventListener("click", async function () {
          // Ajout de async ici
          const confirmation = confirm(
            "Êtes-vous sûr de vouloir supprimer ce projet ?"
          );

          const token = stockerToken;
          const projectId = imageObj.id;
          if (confirmation) {
            try {
              const response = await fetch(
                `http://localhost:5678/api/works/${projectId}`,
                {
                  // Ajout de await ici
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              if (!response.ok) {
                // Vérifie si la réponse est réussie
                throw new Error(`Erreur: ${response.status}`);
              }
              window.location.href = "index.html";
            } catch (error) {
              console.error("Erreur lors de la suppression du projet", error);
            }
          } else {
            console.log(
              "Token d'authentification non trouvé. Connexion requise."
            );
          }
        });

        iconContainer.appendChild(deleteIcon);
        imageContainer.appendChild(img);
        imageContainer.appendChild(iconContainer);
        conteneurImages.appendChild(imageContainer);
      });

      var ligneGrises = document.createElement("div");
      ligneGrises.className = "ligne_grises";

      // Crée un bouton pour ajouter une image
      const addButton = document.createElement("button");
      addButton.textContent = "Ajouter une photo";
      addButton.classList.add("add_button");
      addButton.id = "addButton"; // Ajout de l'ID au bouton
      galerieDiv.appendChild(ligneGrises);
      galerieDiv.appendChild(addButton);

      //--------------–--------------------------------------------
      //----------------    Modale n2    -------------------------
      //--------------–--------------------------------------------

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

        // Crée un bouton pour ajouter une photo dans carré bleu

        const boutonAjouterPhoto = document.createElement("button");
        boutonAjouterPhoto.textContent = "+ Ajouter une photo";
        boutonAjouterPhoto.style.cssText =
          "width: 173px; height: 36px; margin-top: 40px; display: flex; justify-content: center; align-items: center; margin-left: auto; margin-right: auto; position: relative; top: 20%; left: -1%; font-size: 14px; background-color: #CBD6DC; color:#306685; border: none;";
        carreBleu.appendChild(boutonAjouterPhoto);

        const texteFormats = document.createElement("p");
        texteFormats.textContent = "jpg, png : 4Mo max";
        texteFormats.style =
          "position: relative; top: 85%; left: 20%; font-size: 80%;";
        carreBleu.appendChild(texteFormats); // Assurez-vous que texteFormats est ajouté à carreBleu ou à un autre élément visible

        var inputPhoto = document.createElement("input");
        inputPhoto.type = "file";
        inputPhoto.id = "inputPhoto";
        inputPhoto.style.display = "none";
        document.body.appendChild(inputPhoto);

        // Création de l'élément img pour la prévisualisation
        var previewImage = document.createElement("img");
        previewImage.id = "previewImage";
        previewImage.style = "display: none;"; // Initialement masqué
        carreBleu.appendChild(previewImage);

        boutonAjouterPhoto.addEventListener("click", function () {
          inputPhoto.click();
          event.preventDefault();
        });

        inputPhoto.addEventListener("change", function () {
          var file = this.files[0];
          if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
              previewImage.src = e.target.result;
              previewImage.style.display = "block";
              carreBleu.style.display = "flex";
              carreBleu.style.marginTop = "80px";
              carreBleu.style.marginLeft = "100px";
              carreBleu.style.justifyContent = "center";
              carreBleu.style.marginTop = "80px";
              carreBleu.style.alignItems = "center";
              previewImage.style =
                "display: block; wight: 129px; height: 169px;";
              boutonAjouterPhoto.style.display = "none";
              iconeImage.style.display = "none";
              texteFormats.style.display = "none";
            };
            reader.readAsDataURL(file);
          }
        });

        // Création du label pour le titre
        var labelTitre = document.createElement("label");
        labelTitre.textContent = "Titre ";
        labelTitre.htmlFor = "inputTitre";
        labelTitre.style =
          "font-size: 16px; color: black; display: block; position:relative; left: 15%; margin-top: 32px; margin-bottom: 15px";

        // Création de l'input pour le titre
        var inputTitre = document.createElement("input");
        inputTitre.id = "titre";
        inputTitre.type = "text";
        inputTitre.name = "titre"; 
        inputTitre.style.cssText =
          "width: 420px; height: 51px; position: relative; left: 15%; border: none; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);";

        // Ajout de l'écouteur d'événements sur l'inputTitre pour récupérer sa valeur lors de la saisie
        inputTitre.addEventListener("input", (event) => {
          let titre = event.target.value; // Accès direct à la valeur de l'input
          console.log(titre); // Affichage de la valeur dans la console
        });

        // Select Catégorie
        // Création et configuration du label pour le select
        var titreCategorie = document.createElement("p");
        titreCategorie.textContent = "Catégorie";
        titreCategorie.style =
          "display:block; font-size: 16px;position:relative; left: 15%; margin-top: 32px; margin-bottom: 15px;";
        document.body.appendChild(titreCategorie);

        // Création du select pour les catégories
        var selectCategorie = document.createElement("select");
        selectCategorie.id = "category"; // Ajout de l'id pour correspondre avec le htmlFor du label
        selectCategorie.style =
          "width: 420px; height: 51px; position: relative; left: 15.5%; border: none; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1); background-color: white;";

        // Création d'un objet pour mapper les noms des catégories à leurs valeurs
        const categoriesMap = {
          Objets: 1,
          Appartements: 2,
          "Hotels & restaurants": 3,
        };

        // Assurez-vous que selectCategorie est déclaré quelque part
        selectCategorie.addEventListener("change", handleChange);

        function handleChange() {
          const selectedValue = this.value;
          console.log("Valeur de la catégorie sélectionnée:", selectedValue);
        }

        Object.keys(categoriesMap).forEach(function (categorie) {
          const option = document.createElement("option");
          option.value = categoriesMap[categorie];
          option.textContent = categorie;
          selectCategorie.appendChild(option);
        });

        document.body.appendChild(selectCategorie);

        // Définition du style de la ligne grise
        var ligneGrise = document.createElement("div");
        ligneGrise.style =
          "width: 420px; height: 2px; background-color: grey; margin-top: 45px; margin-bottom: 32px; margin-left: 16%";
        document.body.appendChild(ligneGrise);

        // Création du bouton Valider
        var btnValider = document.createElement("button");
        btnValider.id = "btnValider"; // Ajout d'un ID pour cohérence
        btnValider.textContent = "Valider";
        document.body.appendChild(btnValider); // Ajout du bouton au document

        function verifierEtats() {
          const tousRemplis =
            inputTitre.value.trim() !== "" &&
            selectCategorie.value !== "" &&
            inputPhoto.files.length > 0;
          btnValider.style.backgroundColor = tousRemplis ? "#1D6154" : "";
        }
        // Attacher la fonction verifierEtats aux événements appropriés
        inputTitre.addEventListener("input", verifierEtats);
        selectCategorie.addEventListener("change", verifierEtats);
        inputPhoto.addEventListener("change", verifierEtats);

        verifierEtats();

        const selectedValue = this.value;
        let nom = inputTitre.value;
        console.log(nom.value);

        btnValider.addEventListener("click", async (e) => {
          // Changez "submit" par "click" si btnValider est un bouton. Utilisez "submit" sur l'événement du formulaire.
          e.preventDefault();
          const formData = new FormData();
          formData.append("image", inputPhoto.files[0]);
          formData.append("category", selectedValue);
          formData.append("title", titre);
          function stockerToken(token) {
            localStorage.setItem("token", token);
          }

          fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              console.log("Réponse du serveur:", data);
            })
            .catch((error) => {
              console.error("Erreur lors de l'envoi des données:", error);
            });
        });

        // Création d'élément dans DOM
        fenetreDiv.append(
          flecheRetour,
          boutonAjouterPhoto,
          carreBleu,
          labelTitre,
          inputTitre,
          titreCategorie,
          selectCategorie,
          ligneGrise,
          btnValider
        );

        carreBleu.append(iconeImage, texteFormats);
        galerieDiv.appendChild(fenetreDiv);

        const lienLogin = document.querySelector(".co_deco");
        lienLogin.addEventListener("click", function removeToken() {
          localStorage.removeItem("token");
          console.log("token supprimé");
        });
      });
    });
});
