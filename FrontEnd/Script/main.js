document.addEventListener("DOMContentLoaded", async () => {
  await donneeWorks();
  filterAndDisplayWorks(null);
});

const categoriesUrl = "http://localhost:5678/api/categories/";
const filterContainer = document.createElement("div");
filterContainer.classList.add("ctn");

function handleButtonClick(categoryId) {
  // Vérifier si l'ID de la catégorie n'est pas null (ce qui signifie que ce n'est pas le bouton "Tous")
  if (categoryId !== null) {
    // Trouver le bouton "Tous" par son ID et retirer la classe 'colorfiltretous'
    const allButton = document.getElementById("button-all");
    if (allButton) {
      allButton.classList.remove("colorfiltretous");
    }
  }
  // Retirer la classe 'add_button' de tous les boutons
  document.querySelectorAll(".filtre").forEach((button) => {
    button.classList.remove("add_button");
  });

  // Si categoryId est null, cela signifie que le bouton "Tous" a été cliqué
  const buttonId = categoryId === null ? "button-all" : `button-${categoryId}`;
  const clickedButton = document.getElementById(buttonId);
  clickedButton.classList.add("add_button");

  if (clickedButton) {
  }
  console.log("Filtrer par catégorie:", categoryId);
  filterAndDisplayWorks(categoryId);
}

// Creation des bouton filtres depuis API
document.addEventListener("DOMContentLoaded", function () {
  fetch(categoriesUrl)
    .then((response) => response.json())
    .then((categories) => {
      createFilterButton("Tous", "button-all", null);
      categories.forEach((category) => {
        createFilterButton(category.name, `button-${category.id}`, category.id);
      });
      const allButton = document.getElementById("button-all");
      if (allButton) {
        allButton.classList.add("add_button");
        allButton.click();
      }
      const dataContainer = document.querySelector(".gallery#dataContainer");
      dataContainer.before(filterContainer);
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des catégories:", error)
    );
});

// Creation des bouton filtres
function createFilterButton(text, id, categoryId) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("filtre");
  if (text === "Tous") {
    // Identifier le bouton "Tous" par son texte
    button.classList.add("colorfiltretous"); // Ajouter la classe spécifique
  }
  button.id = id;
  button.addEventListener("click", () => handleButtonClick(categoryId));
  filterContainer.appendChild(button);
}

// Affiche les oeuvres filtrees
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

// Cache les filtre lors de la connexion
document.addEventListener("DOMContentLoaded", async () => {
  await donneeWorks();
  filterAndDisplayWorks(null);

  const token = localStorage.getItem("token");
  if (token) {
    const filterButtons = document.querySelectorAll(".filtre");
    filterButtons.forEach((button) => {
      button.style.display = "none";

    });
  }
});