// Utilisation de const pour les variables immuables
const worksData = [];
let currentFilter = "0";

function addWorkData(newWork) {
  worksData.push(newWork);
  applyFilter();
}

function applyFilter() {
  const filteredData = worksData.filter(work => currentFilter == "0" ? work.categoryId >= 1 && work.categoryId <= 3 : work.categoryId == currentFilter);
  displayData(filteredData);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    worksData.push(...data); // Utilisation de spread pour ajouter des éléments
    applyFilter();
  } catch (error) {
    console.error("Erreur lors de la récupération des données de travaux:", error);
  }

  document.addEventListener("click", e => {
    const button = e.target.closest("button:not(.edition)");
    if (button) {
      document.querySelectorAll("button:not(.edition)").forEach(btn => btn.classList.remove("button-clicked"));
      button.classList.add("button-clicked");
      currentFilter = button.getAttribute("data-filter");
      applyFilter();
    }
  });
});

function displayData(data) {
  const dataContainer = document.getElementById("dataContainer");
  let html = ''; // Initialisation d'une chaîne HTML vide

  data.forEach(item => {
    html += `<figure class="work-item">
               <img src="${item.imageUrl}" alt="${item.title}">
               <figcaption>${item.title}</figcaption>
             </figure>`;
  });

  dataContainer.innerHTML = html;
}