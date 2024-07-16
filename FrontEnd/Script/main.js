// Créer un nouvel élément div pour contenir les boutons
const filterContainer = document.createElement("div");
filterContainer.classList.add("ctn");
const API_URL = "http://localhost:5678/api/works/";

// Créer les boutons de filtrage
const filters = ["Tous", "Objets", "Appartements", "Hotels & Restaurents"];
// Ajouté pour stocker toutes les données récupérées
let allWorks = [];
const categoryMapping = {
  1: "Objets",
  2: "Appartements",
  3: "Hotels & Restaurents"
};

function createFilterButton(filterName) {
  const button = document.createElement("button");
  button.textContent = filterName;
  button.classList.add("filtre");
  if (filterName === "Tous") {
    button.classList.add("add_button", "btn_tous");
  } else if (filterName === "Objets") {
    button.classList.add("btn_objets");
  } else if (filterName === "Appartements") {
    button.classList.add("btn_appart");
  } else if (filterName === "Hotels & Restaurents") {
    button.classList.add("btn_resto");
  }
  button.addEventListener("click", (event) =>
    setActiveButton(event.currentTarget, filterName)
  );
  return button;
}

// Correction apportée pour utiliser categoryMapping dans la fonction setActiveButton
function setActiveButton(button, filterName) {
  document
    .querySelectorAll(".filtre")
    .forEach((btn) => btn.classList.remove("add_button"));
  button.classList.add("add_button");

  // Utilisation de categoryMapping pour filtrer les travaux par nom de catégorie
  const worksToDisplay =
    filterName === "Tous"
      ? allWorks
      : allWorks.filter(
          (work) => categoryMapping[work.categoryId] === filterName
        );

  updateDisplay(worksToDisplay);
}

filters.forEach((filterName) => {
  const buttonFiltre = createFilterButton(filterName);
  filterContainer.appendChild(buttonFiltre);
});

const dataContainer = document.getElementById("dataContainer");

// Insérer les boutons de filtrage avant l'élément dataContainer
dataContainer.parentNode.insertBefore(filterContainer, dataContainer);

async function donneeWorks() {
  try {
    const response = await fetch("API_URL");
    if (!response.ok) {
      throw new Error("Réponse réseau non ok");
    }

    const data = await response.json();
    allWorks = data.map((work) => ({
      categoryId: work.categoryId,
      imageUrl: work.imageUrl,
      title: work.title
    }));
    updateDisplay(allWorks); // Afficher les données filtrées
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

// Fonction pour ajouter un nouvel élément à works et mettre à jour l'affichage
function addWork(newWork) {
  allWorks.push(newWork); 
  updateDisplay(allWorks); 
}

// Fonction pour mettre à jour l'affichage
function updateDisplay(allworks) {
  const fragment = document.createDocumentFragment(); 

  allworks.forEach((allwork) => {
    const workElement = document.createElement("div");
    workElement.classList.add("work-item");

    const imageElement = document.createElement("img");
    imageElement.src = allwork.imageUrl;
    workElement.appendChild(imageElement);

    const titleElement = document.createElement("p");
    titleElement.textContent = allwork.title;
    workElement.appendChild(titleElement);

    fragment.appendChild(workElement); // Ajouter l'élément au fragment
  });

  dataContainer.innerHTML = ""; 
  dataContainer.appendChild(fragment); 
}

donneeWorks();
function refreshDataPeriodically() {
  donneeWorks(); 
  setInterval(donneeWorks, 500);
}

refreshDataPeriodically();