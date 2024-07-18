const API_URL = "http://localhost:5678/api/works/";
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`
  };
}


if (localStorage.getItem("token")) {
  // Création de la div pour le mode édition
  var divEditionMode = document.createElement("div");
  divEditionMode.classList.add("edition_mod");
  var header = document.querySelector("header");
  document.body.insertBefore(divEditionMode, header);
  header.style = "margin-top: 150px;";

  // Création de l'icône
  var icon = document.createElement("i");
  icon.className = "fa-regular fa-pen-to-square";
  divEditionMode.appendChild(icon);
  divEditionMode.classList.add("div_edition-mode");
  divEditionMode.append(" mode édition");

  // Sélectionner l'élément par son id
  var loginLink = document.querySelector("#loginLink a");
  if (loginLink) {
    loginLink.textContent = "logout";
  }

  const lienLogout = document.querySelector(".co_deco a");
  if (lienLogout && lienLogout.textContent.toLowerCase() === "logout") {
    lienLogout.addEventListener("click", function () {
      localStorage.removeItem("token");
      console.log("Token supprimé");
    });
  }
} else {
  const buttonEditionHide = document.querySelector(".edition");
buttonEditionHide.style.display = "none";
  console.log("Aucun token trouvé, contenu non affiché.");
}
// Création et ajout du bouton pour ouvrir la modale
const spanProjets = document.querySelector("h2 > .projets");
if (spanProjets) {
  const h2MesProjets = spanProjets.parentNode;
  const button = document.createElement("button");
  button.className = "edition";
  const iconBis = document.createElement("i");
  iconBis.id = "editionIcon";
  iconBis.className = "marge_gauche -- fa-regular fa-pen-to-square";
  button.appendChild(iconBis);
  button.appendChild(document.createTextNode("modifier"));

  // Insérer le bouton dans le DOM juste après l'élément <h2> ciblé
  h2MesProjets.insertAdjacentElement("afterend", button);

  const buttonModale = document.querySelector(".edition");
  buttonModale.addEventListener("click", function (event) {
    const target = event.target; // Obtient l'élément cliqué
    let overlay = document.querySelector("#overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "overlay";
      document.body.appendChild(overlay);
    }

    //--------------–------------------------------------------
    //----------------    Modale n1   -------------------------
    //--------------–------------------------------------------

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

    async function chargerImages() {
      try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const images = await response.json();

        // Vérifier si le conteneur d'images existe déjà
        let conteneurImages = document.querySelector(".conteneur-images");
        if (conteneurImages) {
          // Nettoyer le conteneur existant
          conteneurImages.innerHTML = "";
        } else {
          // Créer un nouveau conteneur d'images
          conteneurImages = document.createElement("div");
          conteneurImages.className = "conteneur-images";
          galerieDiv.appendChild(conteneurImages);
        }
        images.forEach((imageObj) => {
          // Crée un conteneur div pour l'image et l'icône
          const imageContainer = document.createElement("div");
          imageContainer.style = "position: relative; display: inline-block;";

          // Crée l'élément img
          const img = document.createElement("img");
          img.src = imageObj.imageUrl;
          img.style = "width: 77px; height: 103px;";

          // Création du conteneur et de l'icône de suppression
          const iconContainer = document.createElement("div");
          iconContainer.className = "icon_container";

          const deleteIcon = document.createElement("i");
          deleteIcon.className = "fa-solid fa-trash-can";
          deleteIcon.style = "color: white; font-size: 10px;";

          // Message de confirmation de suppression
          const DELETE_CONFIRM_MSG =
            "Êtes-vous sûr de vouloir supprimer ce projet ?";

          // Fonction asynchrone pour supprimer un projet
          const supprimerProjet = async (projectId, imageContainer) => {
            // Vérification de l'authentification
            if (!getAuthHeaders()) {
              console.log(AUTH_ERROR_MSG);
              return;
            }

            // Confirmation de la suppression par l'utilisateur
            if (!confirm(DELETE_CONFIRM_MSG)) return;

            try {
              const response = await fetch(`${API_URL}/${projectId}`, {
                method: "DELETE",
                headers: getAuthHeaders()
              });

              if (!response.ok)
                throw new Error("Échec de la suppression du projet");

              // Suppression réussie, retirer l'image du DOM
              if (imageContainer && imageContainer.parentNode) {
                imageContainer.parentNode.removeChild(imageContainer);
                donneeWorks()
                  .then(() => filterAndDisplayWorks(null))
                  .catch((error) =>
                    console.error(
                      "Erreur lors du rechargement des images:",
                      error
                    )
                  );
              }
            } catch (error) {
              console.error("Erreur lors de la suppression du projet:", error);
              // Ici, ajouter une logique pour afficher l'erreur à l'utilisateur
            }
          };

          // Ajout de l'écouteur d'événements sur l'icône de suppression
          deleteIcon.addEventListener("click", () =>
            supprimerProjet(imageObj.id, imageContainer)
          );
          iconContainer.appendChild(deleteIcon);
          imageContainer.appendChild(img);
          imageContainer.appendChild(iconContainer);
          conteneurImages.appendChild(imageContainer);
        });

        // Crée une ligne grise
        var ligneGrises = document.createElement("div");
        ligneGrises.className = "ligne_grises";

        // Crée un bouton pour ajouter une image
        const addButton = document.createElement("button");
        addButton.textContent = "Ajouter une photo";
        addButton.classList.add("add_button", "position_button_modal1");
        addButton.id = "addButton";
        galerieDiv.appendChild(ligneGrises);
        galerieDiv.appendChild(addButton);

        //--------------–--------------------------------------
        //----------------    Modale n2    --------------------
        //--------------–--------------------------------------

        addButton.addEventListener("click", function () {
          // Crée une nouvelle "fenêtre" div
          const fenetreDiv = document.createElement("div");
          fenetreDiv.id = "fenetre-id";
          // Style de la "fenêtre"
          const titre1 = document.createElement("h3");
          titre1.textContent = "Ajout photo";
          titre1.classList.add("titre_ajout_photo");
          fenetreDiv.appendChild(titre1);
          // Fleche retour
          var flecheRetour = document.createElement("button");
          flecheRetour.innerHTML = '<i class="fa-solid fa-arrow-left"></i> ';
          flecheRetour.classList.add("fleche_retour");

          // Crée un nouveau div pour le carré bleu
          const carreBleu = document.createElement("div");
          // Définit le style du carré
          carreBleu.style =
            "width: 420px; height: 169px; background-color: #E8F1F6; display: flex; flexDirection: column; justifyContent: center; alignItems: center; margin: 0 auto;";

          // Crée un élément i pour l'icône
          const iconeImage = document.createElement("i");
          iconeImage.className = "fa-regular fa-image icone-image";

          // Ajout d'un gestionnaire d'événements pour revenir à galerieDiv
          flecheRetour.addEventListener("click", function () {
            galerieDiv.removeChild(galerieDiv.lastChild);
          });

          // Crée un bouton pour ajouter une photo dans carré bleu
          const boutonAjouterPhoto = document.createElement("button");
          boutonAjouterPhoto.textContent = "+ Ajouter une photo";
          boutonAjouterPhoto.classList.add("bouton-ajouter-photo");
          carreBleu.appendChild(boutonAjouterPhoto);

          const texteFormats = document.createElement("p");
          texteFormats.textContent = "jpg, png : 4Mo max";
          texteFormats.classList.add("texte-formats");
          carreBleu.appendChild(texteFormats);

          var inputPhoto = document.createElement("input");
          inputPhoto.type = "file";
          inputPhoto.id = "inputPhoto";
          inputPhoto.style.display = "none";
          document.body.appendChild(inputPhoto);

          // Création de l'élément img pour la prévisualisation
          var previewImage = document.createElement("img");
          previewImage.id = "previewImage";
          previewImage.style = "display: none;";
          carreBleu.appendChild(previewImage);

          boutonAjouterPhoto.addEventListener("click", function (event) {
            inputPhoto.click();
          });

          inputPhoto.addEventListener("change", function () {
            event.preventDefault();
            var file = this.files[0];
            if (file) {
              var reader = new FileReader();
              reader.onload = function (e) {
                // Définit la source de l'élément img
                previewImage.src = e.target.result;
                carreBleu.style.display = "flex";
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
              // Lit le fichier comme une URL de données
              reader.readAsDataURL(file);
            }
          });

          // Création du label pour le titre
          var labelTitre = document.createElement("label");
          labelTitre.textContent = "Titre ";
          labelTitre.htmlFor = "titre"; // Modifié pour correspondre à l'id de l'input
          labelTitre.className = "label-style";

          // Création de l'input pour le titre
          var inputTitre = document.createElement("input");
          inputTitre.id = "titre"; // L'id ici doit correspondre à la valeur de l'attribut htmlFor du label
          inputTitre.type = "text";
          inputTitre.name = "titre";
          inputTitre.className = "input-style";

          // Ajout de l'écouteur d'événements sur l'inputTitre
          inputTitre.addEventListener("input", (event) => {
            let titre = event.target.value;
          });

          // Select Catégorie
          // Création et configuration du label pour le select
          var titreCategorie = document.createElement("p");
          titreCategorie.textContent = "Catégorie";
          titreCategorie.className = "label-style";
          document.body.appendChild(titreCategorie);

          // Création du select pour les catégories
          var selectCategorie = document.createElement("select");
          selectCategorie.id = "category";
          selectCategorie.className = "select-style";

          // Création d'un objet pour mapper les noms des catégories à leurs valeurs
          const categoriesMap = {
            Objets: 1,
            Appartements: 2,
            "Hotels & restaurants": 3
          };

          // Ajout des options au select à partir de categoriesMap
          Object.keys(categoriesMap).forEach(function (categorie) {
            const option = document.createElement("option");
            option.value = categoriesMap[categorie];
            option.textContent = categorie;
            selectCategorie.appendChild(option);
          });

          // Gestionnaire d'événement pour récupérer la valeur sélectionnée
          selectCategorie.addEventListener("change", function () {
            const valeurSelectionnee = this.value;
            console.log(
              "Valeur de la catégorie sélectionnée:",
              valeurSelectionnee
            );
          });
          document.body.appendChild(selectCategorie);

          // Définition du style de la ligne grise
          var ligneGrise = document.createElement("div");
          ligneGrise.classList.add("ligne-grise");
          document.body.appendChild(ligneGrise);

          // Création du bouton Valider
          var btnValider = document.createElement("button");
          btnValider.id = "btnValider";
          btnValider.textContent = "Valider";
          document.body.appendChild(btnValider);

          function verifierEtats() {
            const tousRemplis =
              inputTitre.value.trim() !== "" &&
              selectCategorie.value !== "" &&
              inputPhoto.files.length > 0;
            btnValider.style.backgroundColor = tousRemplis ? "#1D6154" : "";
            btnValider.disabled = !tousRemplis;
          }
          // Attacher la fonction verifierEtats aux événements appropriés
          inputTitre.addEventListener("input", verifierEtats);
          selectCategorie.addEventListener("change", verifierEtats);
          inputPhoto.addEventListener("change", verifierEtats);
          verifierEtats();

          async function sendData(url, formData) {
            // Vérification du token avant l'envoi
            const token = localStorage.getItem("token");
            if (!token) {
              console.log(
                "Token d'authentification non trouvé. Connexion requise."
              );
              // Afficher un message à l'utilisateur ou rediriger vers la page de connexion
              return;
            }

            try {
              const response = await fetch(url, {
                method: "POST",
                body: formData,
                headers: getAuthHeaders()
              });

              if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
              }

              const data = await response.json();

              galerieDiv.removeChild(galerieDiv.lastChild);
              console.log("Réponse du serveur:", data);
              // Afficher un message de succès ou une confirmation avant de rediriger
            } catch (error) {
              console.error("Erreur lors de l'envoi des données:", error);
              // Afficher un message d'erreur à l'utilisateur
            }
          }

          function createFormData() {
            const formData = new FormData();
            // Assurez-vous que les entrées sont valides (non illustré ici)
            formData.append("image", inputPhoto.files[0]);
            formData.append("category", selectCategorie.value);
            formData.append("title", inputTitre.value);
            return formData;
          }

          // Ajout de l'écouteur d'événements sans vérification du token ici
          btnValider.addEventListener("click", async (e) => {
            e.preventDefault();
            const formData = createFormData();
            await sendData(API_URL, formData);
            galerieDiv.innerHTML = "";
            const titre = document.createElement("h3");
            titre.textContent = "Galerie photo";
            titre.classList.add("titre_galerie");
            galerieDiv.appendChild(titre);
            chargerImages()
              .then(() => console.log("Images rechargées"))
              .catch((error) =>
                console.error("Erreur lors du rechargement des images:", error)
              );

            donneeWorks()
              .then(() => filterAndDisplayWorks(null))
              .catch((error) =>
                console.error("Erreur lors du rechargement des images:", error)
              );
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
        });
      } catch (error) {
        console.error("Erreur lors du chargement des images", error);
      }
    }
    chargerImages()
      .then(() => console.log("Images chargées"))
      .catch((error) =>
        console.error("Erreur lors du chargement des images:", error)
      );
  });
}
