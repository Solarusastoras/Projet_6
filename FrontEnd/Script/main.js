document.addEventListener("DOMContentLoaded", async () => {
  await donneeWorks();
  filterAndDisplayWorks(null);
});

const categoriesUrl = "http://localhost:5678/api/categories/";
const filterContainer = document.createElement("div");
filterContainer.classList.add("ctn");

function handleButtonClick(categoryId) {
  // Étape 1: Retirer la classe 'add_button' de tous les boutons
  document.querySelectorAll(".filtre").forEach((button) => {
    button.classList.remove("add_button");
  });

  // Si categoryId est null, cela signifie que le bouton "Tous" a été cliqué
  const buttonId = categoryId === null ? "button-all" : `button-${categoryId}`;
  const clickedButton = document.getElementById(buttonId);
  if (clickedButton) {
    clickedButton.classList.add("add_button");
  }

  // Continuer avec la logique de filtrage
  console.log("Filtrer par catégorie:", categoryId);
  filterAndDisplayWorks(categoryId);
}

// Ajout de la fonction activateDefaultButton


fetch(categoriesUrl)
  .then((response) => response.json())
  .then((categories) => {
    createFilterButton("Tous", "button-all", null);
    // Sélectionner le bouton "Tous" par défaut
    const allButton = document.getElementById("Tous");
    if (allButton) {
      allButton.classList.add("add_button");
      // Simuler un clic sur le bouton "Tous" pour le sélectionner par défaut
      allButton.click();
    }
    categories.forEach((category) => {
      createFilterButton(category.name, `button-${category.id}`, category.id);
    });
    const dataContainer = document.querySelector(".gallery#dataContainer");
    dataContainer.before(filterContainer);
  })
  .catch((error) =>
    console.error("Erreur lors de la récupération des catégories:", error)
  );
function createFilterButton(text, id, categoryId) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("filtre");
  button.id = id;
  button.addEventListener("click", () => handleButtonClick(categoryId));
  filterContainer.appendChild(button);
}

let allWorks = [];

async function donneeWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works/");
    if (!response.ok) throw new Error("Réponse réseau non ok");
    const data = await response.json();
    allWorks = data.map(({ categoryId, imageUrl, title }) => ({
      categoryId,
      imageUrl,
      title
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

function filterAndDisplayWorks(categoryId) {
  const filteredWorks =
    categoryId === null
      ? allWorks
      : allWorks.filter((work) => work.categoryId === categoryId);
  displayWorks(filteredWorks);
}

function displayWorks(works) {
  const container = document.querySelector(".gallery");
  container.innerHTML = "";
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
document.addEventListener("DOMContentLoaded", async () => {
  await donneeWorks();
  filterAndDisplayWorks(null); 
});

const token = localStorage.getItem("token");
if (token) {
  // Si un token est présent, cacher les boutons de filtre
  const filterButtons = document.querySelectorAll(".filtre");
  filterButtons.forEach((button) => {
    button.style.display = "none";
     const divEditionMode = document.querySelector(".edition_mod");
   divEditionMode.style.display = "none"; 
  });
}
