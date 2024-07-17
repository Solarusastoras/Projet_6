document.addEventListener("DOMContentLoaded", async () => {
  await donneeWorks();
  filterAndDisplayWorks(null);
});

// Création du conteneur de filtres
const filterContainer = document.createElement("div");
filterContainer.classList.add("ctn");
// Création des boutons
const buttonTous = document.createElement("button");
buttonTous.textContent = "Tous";
buttonTous.classList.add("filtre");
buttonTous.classList.add("filtre", "active");
buttonTous.id = "button-tous";

const buttonObjets = document.createElement("button");
buttonObjets.textContent = "Objets";
buttonObjets.classList.add("filtre");
buttonObjets.id = "button-objets";

const buttonApparts = document.createElement("button");
buttonApparts.textContent = "Appartements";
buttonApparts.classList.add("filtre");
buttonApparts.id = "button-apparts";

const buttonHotels = document.createElement("button");
buttonHotels.textContent = "Hotels & Restaurants";
buttonHotels.classList.add("filtre");
buttonHotels.id = "button-hotels";

filterContainer.append(buttonTous, buttonObjets, buttonApparts, buttonHotels);

// Sélection du div où insérer le conteneur de filtres avant
const dataContainer = document.querySelector(".gallery#dataContainer");

// Insertion du conteneur de filtres avant le div sélectionné
dataContainer.parentNode.insertBefore(filterContainer, dataContainer);

const allButtons = document.querySelectorAll(".filtre");
function handleButtonClick(clickedButton) {
  // Enlever la classe 'add_button' de tous les boutons
  allButtons.forEach((button) => {
    button.classList.remove("add_button");
  });
  // Ajouter la classe 'add_button' au bouton cliqué
  clickedButton.classList.add("add_button");
}

// Ajouter un écouteur d'événements 'click' à chaque bouton
allButtons.forEach((button) => {
  button.addEventListener("click", function () {
    handleButtonClick(this);
  });
});

let allWorks = []; // Déplacer la déclaration ici pour une portée globale

// Fonction pour afficher les travaux
function displayWorks(works) {
  const container = document.querySelector(".gallery");
  container.innerHTML = ""; // Nettoyer le contenu précédent
  works.forEach((work) => {
    const workElement = document.createElement("div");
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    workElement.appendChild(imageElement);
    workElement.appendChild(document.createTextNode(work.title));
    container.appendChild(workElement);
  });
}

// Fonction pour filtrer et afficher les travaux basés sur categoryId
function filterAndDisplayWorks(categoryId) {
  const filteredWorks = allWorks.filter(
    (work) => categoryId === null || work.categoryId === categoryId
  );
  displayWorks(filteredWorks);
}

document.addEventListener("DOMContentLoaded", () => {
  donneeWorks(); // Initialiser allWorks

  // Configurer les boutons de filtrage
  const filtreTous = document.getElementById("button-tous");
  const filtreObjet = document.getElementById("button-objets");
  const filtreApparts = document.getElementById("button-apparts");
  const filtreHotels = document.getElementById("button-hotels");

  filtreTous.addEventListener("click", () => filterAndDisplayWorks(null)); // null pour 'Tous'
  filtreObjet.addEventListener("click", () => filterAndDisplayWorks(1));
  filtreApparts.addEventListener("click", () => filterAndDisplayWorks(2));
  filtreHotels.addEventListener("click", () => filterAndDisplayWorks(3));

  // Sélectionner tous par défaut
  filtreTous.click();
});

async function donneeWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works/");
    if (!response.ok) {
      throw new Error("Réponse réseau non ok");
    }

    const data = await response.json();
    allWorks = data.map((work) => ({
      categoryId: work.categoryId,
      imageUrl: work.imageUrl,
      title: work.title
    }));
    // Pas besoin d'appeler updateDisplay ici, sauf si vous souhaitez afficher tous les travaux initialement
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

const buttonClicked = document.querySelector(".edition");
buttonClicked.addEventListener("click", () => {
  const startTime = Date.now(); // Enregistrer le temps de début
  const interval = 2500; // Intervalle entre les appels en millisecondes
  const duration = 2 * 60000;
  const intervalId = setInterval(async () => {
    if (Date.now() - startTime > duration) {
      clearInterval(intervalId); // Arrêter l'intervalle après 4 minutes
      // Réafficher le conteneur de filtres si nécessaire
      return; // Sortir de la fonction
    }

    try {
      await donneeWorks();
      window.donneeWorks = donneeWorks;
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      clearInterval(intervalId); // Arrêter l'intervalle en cas d'erreur
      filterContainer.style.display = ""; // Réafficher le conteneur de filtres si nécessaire
    }
  }, interval);
});



const token = localStorage.getItem("token");

if (token) {
  // Si un token est présent, cacher les boutons de filtre
  const filterButtons = document.querySelectorAll(".filtre");
  filterButtons.forEach((button) => {
    button.style.display = "none";
  });
}
