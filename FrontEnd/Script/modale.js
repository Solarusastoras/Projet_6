const elementEditionMode = document.querySelector(".edition_mode");
const buttonEdition = document.querySelector(".edition");

//Mise en place des éléments admin
if (localStorage.token) {
  elementEditionMode.classList.add("visible");
  buttonEdition.classList.add("visible");
  console.log("Modale affichée");
}

function afficherModale() {
  // Ajoute une classe CSS aux éléments pour les rendre visibles
  elementEditionMode.classList.add("visible");
  buttonEdition.classList.add("visible");
  console.log("Modale affichée");
}

function addImage(imageUrl) {
  const img = document.createElement("img");
  img.src = imageUrl;
  document.body.appendChild(img); // Assurez-vous que c'est le bon endroit pour ajouter votre image
}

const buttons = document.querySelectorAll("button:not(.edition)");

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
    "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 630px; height: 680px; background-color: white; z-index: 100;";

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
        "display: flex; flex-wrap: wrap; justify-content: left; gap: 10px; padding: 20px; magin-bottom: 20px; margin-left: 25px";
      galerieDiv.appendChild(conteneurImages);

      images.forEach((imageObj) => {
        // Crée un conteneur div pour l'image et l'icône
        const imageContainer = document.createElement("div");
        imageContainer.style = "position: relative; display: inline-block;";

        // Crée l'élément img
        const img = document.createElement("img");
        img.src = imageObj.imageUrl;
        img.style = "width: 100px; height: auto;";

        // Crée un conteneur pour l'icône
        const iconContainer = document.createElement("div");
        iconContainer.style =
          "position: absolute; top: 8px; right: 8px; height: 20px; width: 20px; background-color: black; display: flex; justify-content: center; align-items: center; cursor: pointer;";

        // Crée l'icône de suppression
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-trash-can";
        deleteIcon.style = "color: white; font-size: 12px;"; // Assure que l'icône est blanche pour contraster avec le fond noir

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
      // Crée un bouton pour ajouter une image
      const addButton = document.createElement("button");
      addButton.textContent = "Ajouter une photo";
      // Style du bouton, ajustez selon vos besoins
      addButton.style =
        "position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); padding: 10px 20px;background-color: #1d6154; color: white";

      // Ajoute le bouton à galerieDiv
      galerieDiv.appendChild(addButton);



//-------- ajouter photo + titre et catégorie -------------

      addButton.addEventListener("click", function () {
        // Crée une nouvelle "fenêtre" div
        const fenetreDiv = document.createElement("div");
        fenetreDiv.id = "fenetre-id"; // Donnez un ID unique
        // Style de la "fenêtre"
        fenetreDiv.style =
          "widht:630px; height: ;position: absolute; top: 0%; left: 0%; width: 100%; height:680px; 100%; background-color: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);";
        const titre1 = document.createElement("h3");
        titre1.textContent = "Ajout photo";
        titre1.style = "text-align: center; margin-top: 67px; font-size: 28px;margin-bottom: -40px ";
        fenetreDiv.appendChild(titre1);

        var flecheRetour = document.createElement('button');
flecheRetour.innerHTML = '<i class="fa-solid fa-arrow-left"></i> '; 
flecheRetour.style = "position: absolute; top: 27px; left: 20px; cursor: pointer; font-size: 200%; border: transparent !important; color: black;";
       


        // Crée un nouveau div pour le carré bleu
        const carreBleu = document.createElement("div");

        // Définit le style du carré
        carreBleu.style =
          "width: 420px; height: 169px; background-color: #E8F1F6;display: flex; flexDirection: column; justifyContent: center; alignItems: center; margin: 0 auto;";


        // Crée un élément i pour l'icône
        const iconeImage = document.createElement("i");
        iconeImage.className = "fa-regular fa-image";
        iconeImage.style =
          "font-size: 500%; color: #B9C5CC; display: flex; position: relative; top:10%; left:40%";

          
      // Ajout d'un gestionnaire d'événements pour revenir à galerieDiv
flecheRetour.addEventListener('click', function() {
  galerieDiv.removeChild(galerieDiv.lastChild);
  });



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
        labelTitre.textContent = "Titre : ";
        labelTitre.htmlFor = "inputTitre"; // Associe le label à l'input par l'ID
        labelTitre.style =
          "font-size: 16px; color: black; display: block; position:relative;; left: 15%; margin-top: 32px ;margin-bottom: 15px";

        // Corriger la création de l'input pour le titre
        var inputTitre = document.createElement("input");
        inputTitre.style.cssText =
          "width: 420px; height: 51px; position: relative;left: 15%; border: none; box-shadow: 4px 3px 4px rgba(0, 0, 0, 0.1);";

        // Select Catégorie
        // Création du select pour les catégories
        var selectCategorie = document.createElement("select");
        selectCategorie.name = "categorie";
        selectCategorie.id = "categorie"; // Ajout de l'ID pour le lier au label
        selectCategorie.style =
          "width: 420px; height: 51px; position: relative; left: 15.5%; border: none; box-shadow: 4px 3px 4px rgba(0, 0, 0, 0.1); background-color: white; margin-top: 32px";

        // Création et configuration du label pour le select
        var labelSelectCategorie = document.createElement("label");
        labelSelectCategorie.textContent = "Catégorie";
        labelSelectCategorie.htmlFor = "categorie";

        // Ajouter des options au select
        var categories = ["Objet", "Appartements", "Hotels & restaurants"]; // Exemple de catégories
        categories.forEach(function (categorie) {
          var option = document.createElement("option");
          option.value = categorie;
          option.textContent = categorie;
          selectCategorie.appendChild(option);
        });

        // Définition du style de la ligne

        var ligneGrise = document.createElement("div");
        ligneGrise.style =
          "width: 420px; height: 2px; background-color: grey; margin-top: 45px; margin-bottom: 32px; margin-left: 16%";

        var btnValider = document.createElement("button");
        btnValider.textContent = "Valider";
        btnValider.style =
          "width: 237px; height: 36px; background-color: #A7A7A7; color: white; boder: none; margin-left: 28%; border: none"; // Couleur initiale à gris
        // Ajoutez le bouton au document

        // Fonction pour vérifier l'état des champs et ajuster la couleur du bouton
        function verifierEtats() {
          if (inputTitre.value.trim() !== "" && selectCategorie.value !== "") {
            // Si les deux champs sont remplis, mettre le bouton en vert
            btnValider.style =
              "background-color: green; color: white;width: 237px; height: 36px; boder: none; margin-left: 28%";
          }
        }
        // Ajouter des écouteurs d'événements sur les champs pour vérifier leur état à chaque modification
        inputTitre.addEventListener("input", verifierEtats);
        selectCategorie.addEventListener("change", verifierEtats);

        //ajout fonction pour ajouter la photo
        let divPhotos = document.getElementById('divPhotos');
if (!divPhotos) {
    divPhotos = document.createElement('div');
    divPhotos.id = 'divPhotos';
    document.body.appendChild(divPhotos); // Ou ajoutez-le à un autre élément spécifique
}
        // Création de l'élément input de type file
        var inputPhoto = document.createElement("input");
        inputPhoto.type = "file";
        inputPhoto.accept = "image/*"; // Accepte uniquement les fichiers image
        inputPhoto.style.display = "none"; // Cache l'input pour des raisons esthétiques

        // Ajoute l'élément input au document
        document.body.appendChild(inputPhoto);

        // Associe un écouteur d'événements au bouton pour déclencher un clic sur l'input
        boutonAjouterPhoto.addEventListener("click", function () {
          inputPhoto.click();
        });

        

        fenetreDiv.appendChild(flecheRetour);
        // Ajoute le bouton à fenetreDiv
        fenetreDiv.appendChild(boutonAjouterPhoto);
        // Ajoute l'icône à carreBleu
        carreBleu.appendChild(iconeImage);
        // Ajoute le carré à fenetreDiv
        fenetreDiv.appendChild(carreBleu);
        // Ajoute le carré au carreBleu
        carreBleu.appendChild(texteFormats);
        // Ajoute la "fenêtre" à galerieDiv
        galerieDiv.appendChild(fenetreDiv);
        // Ajouter le label et l'input au document
        fenetreDiv.appendChild(labelTitre);
        // Ajoute le label au body // Ajoute l'input au body
        fenetreDiv.appendChild(inputTitre);
        fenetreDiv.appendChild(labelSelectCategorie);
        fenetreDiv.appendChild(selectCategorie);
        fenetreDiv.appendChild(ligneGrise);
        fenetreDiv.appendChild(btnValider);
      });

      // Ajoute un gestionnaire d'événements au bouton pour ajouter une image lorsqu'il est cliqué
      addButton.addEventListener("click", addImage);
    })
    .catch((error) =>
      console.error("Erreur lors du chargement des images :", error)
    );

  function removeToken() {
    localStorage.removeItem("token");
  }
});
