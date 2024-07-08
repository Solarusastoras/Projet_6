// Récupération email, password, form
let inputEmail = document.querySelector("#email");
let inputPassword = document.querySelector("#mdp");
let formConnexion = document.querySelector("form");

function afficherErreur(message) {
  console.error(message);
}

formConnexion.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userLogin = {
    email: inputEmail.value,
    password: inputPassword.value,
  };
  const userBodyValue = JSON.stringify(userLogin);
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: userBodyValue,
  })
    .then((res) => {
      if (res.status === 200) {
        return response.json();
      } else {
        throw new Error("Erreur dans l'identifiant ou le mot de passe");
      }
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      location.href = "./index.html"; // Commentez cette ligne pour le débogage
      console.log("Connexion Réussi et le Token est : " + data.token);
    })
    .catch((error) => {
      afficherErreur(error.message);
    });
});

function afficherErreur(message) {
  console.error(message);

  const divErreur = document.createElement("div");
  divErreur.classList.add("erreur");

  const messageErreurElement = document.createElement("p");
  messageErreurElement.innerText = message;

  divErreur.appendChild(messageErreurElement);
  formConnexion.insertBefore(divErreur, formConnexion.firstChild); // Utilisation de formConnexion
}
function stockerToken(token) {
  localStorage.setItem("token", token);
}
