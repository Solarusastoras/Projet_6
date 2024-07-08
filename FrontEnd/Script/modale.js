if (localStorage.getItem("token")) {
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

  // Sélectionner l'élément par son id
  var loginLink = document.querySelector("#loginLink a");

  // Vérifier si l'élément existe et changer son texte en 'logout'
  if (loginLink) {
    loginLink.textContent = "logout";
  }

  const lienLogout = document.querySelector(".co_deco a");

  // Vérifier si le lien existe et que son texte est 'logout'
  if (lienLogout && lienLogout.textContent.toLowerCase() === "logout") {
    lienLogout.addEventListener("click", function () {
      localStorage.removeItem("token");
      console.log("Token supprimé");
    });
  }
  // button pour ouvrir Modale
  const spanProjets = document.querySelector("h2 > .projets");
  // Remonter au parent <h2>
  const h2MesProjets = spanProjets.parentNode;
  const button = document.createElement("button");
  button.className = "edition";

  // Ajouter l'icône au bouton
  const iconBis = document.createElement("i");
  iconBis.id = "editionIcon";
  iconBis.className = "marge_gauche -- fa-regular fa-pen-to-square";
  button.appendChild(iconBis);
  button.appendChild(document.createTextNode("modifier"));

  // Insérer le bouton dans le DOM juste après l'élément <h2> ciblé
  h2MesProjets.insertAdjacentElement("afterend", button);
}

const button = document.querySelector("button");
// Ajout de l'écouteur d'événements sur le bouton d'édition
button.addEventListener("click", function () {
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

        // Supprimer un projet
        // Fonction séparée pour la suppression du projet
        const API_URL = "http://localhost:5678/api/works/";
        const DELETE_CONFIRM_MSG = "Êtes-vous sûr de vouloir supprimer ce projet ?";
        
        const getAuthHeaders = () => ({
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        });
        
        const supprimerProjet = async (projectId) => {
          try {
            const response = await fetch(`${API_URL}${projectId}`, {
              method: "DELETE",
              headers: getAuthHeaders(),
            });
            if (!response.ok) {
              throw new Error(`Erreur: ${response.status}`);
            }
            window.location.href = "index.html";
          } catch (error) {
            console.error("Erreur lors de la suppression du projet", error);
            // Afficher un message d'erreur à l'utilisateur ici
          }
        };
        
        if (localStorage.getItem("token")) {
          deleteIcon.addEventListener("click", async () => {
            if (confirm(DELETE_CONFIRM_MSG)) {
              await supprimerProjet(imageObj.id);
            }
          });
        } else {
          console.log(AUTH_ERROR_MSG);
        }
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
      addButton.classList.add("add_button");
      addButton.id = "addButton";
      galerieDiv.appendChild(ligneGrises);
      galerieDiv.appendChild(addButton);

      //--------------–--------------------------------------
      //----------------    Modale n2    --------------------
      //--------------–--------------------------------------

      addButton.addEventListener("click", function () {
        // Crée une nouvelle "fenêtre" div
        const fenetreDiv = document.createElement("div");
        fenetreDiv.id = "fenetre-id"; // Donnez un ID unique
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
          event.preventDefault();
        });

        inputPhoto.addEventListener("change", function () {
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
        labelTitre.htmlFor = "inputTitre";
        labelTitre.className = "label-style";

        // Création de l'input pour le titre
        var inputTitre = document.createElement("input");
        inputTitre.id = "titre";
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
          "Hotels & restaurants": 3,
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

        // Envoi des données
        const API_URL = "http://localhost:5678/api/works";
        const getAuthHeaders = () => ({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        });
        
        async function sendData(url, formData) {
          try {
            const response = await fetch(url, {
              method: "POST",
              body: formData,
              headers: getAuthHeaders(),
            });
        
            if (!response.ok) {
              throw new Error(`Erreur HTTP: ${response.status}`);
            }
        
            const data = await response.json();
            console.log("Réponse du serveur:", data);
            window.location.href = "index.html";
          } catch (error) {
            console.error("Erreur lors de l'envoi des données:", error);
          }
        }
        
        function createFormData() {
          const formData = new FormData();
          formData.append("image", inputPhoto.files[0]);
          formData.append("category", selectCategorie.value);
          formData.append("title", inputTitre.value);
          return formData;
        }
        
        if (localStorage.getItem("token")) {
          btnValider.addEventListener("click", async (e) => {
            e.preventDefault();
            const formData = createFormData();
            await sendData(API_URL, formData);
          });
        } else {
          console.log("Token d'authentification non trouvé. Connexion requise.");
        }

        // Création d'élément dans DOM
        fenetreDiv.append(flecheRetour, boutonAjouterPhoto, carreBleu, labelTitre, inputTitre, titreCategorie, selectCategorie, ligneGrise, btnValider);
        carreBleu.append(iconeImage, texteFormats);
        galerieDiv.appendChild(fenetreDiv);
      });
    } catch (error) {
      console.error("Erreur lors du chargement des images", error);
    }
  }
  chargerImages();
});
