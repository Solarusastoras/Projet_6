document.addEventListener("DOMContentLoaded", function () {
  // Initialisation des éléments du DOM
  const form = document.querySelector("#formLogin");
  const loginButton = document.querySelector("#login");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#mdp");
  const loginEmailError = document.querySelector("#loginEmailError");
  const loginMdpError = document.querySelector("#loginMdpError");

  // Gestion du bouton de connexion/déconnexion
  initializeLoginButton();

  // Écouteur d'événement pour la soumission du formulaire
  form.addEventListener("submit", handleFormSubmit);

  // Fonction pour initialiser le bouton de connexion/déconnexion
  function initializeLoginButton() {
    const token = localStorage.getItem("token");
    if (token) {
      loginButton.textContent = "Logout";
      loginButton.addEventListener("click", () =>
        localStorage.removeItem("token")
      );
    }
  }

  // Fonction pour gérer la soumission du formulaire
  function handleFormSubmit(event) {
    event.preventDefault(); // Empêche le comportement par défaut

    clearErrorMessages(); // Réinitialise les messages d'erreur

    const email = emailInput.value;
    const password = passwordInput.value;

    login({ email, password })
      .then(handleLoginResponse)
      .catch((error) => console.log(error)); // Log en cas d'erreur de la requête
  }

  // Fonction pour effacer les messages d'erreur
  function clearErrorMessages() {
    loginEmailError.innerHTML = "";
    loginMdpError.innerHTML = "";
  }

  // Fonction pour gérer la réponse de la tentative de connexion
  function handleLoginResponse(result) {
    if (result.error || result.message) {
      displayLoginError();
    } else if (result.token) {
      successfulLogin(result.token);
    }
  }

  // Affiche un message d'erreur de connexion
  function displayLoginError() {
    const p = document.createElement("p");
    p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
    loginMdpError.appendChild(p);
  }

  // Gère une connexion réussie
  function successfulLogin(token) {
    localStorage.setItem("token", token);
    window.location.href = "../index.html";
    document.querySelector(".edition_mode").style.display = "block";
     // Sélection de l'élément <h2> Mes Projets
     const h2MesProjets = document.querySelector('h2');
     if (h2MesProjets && h2MesProjets.textContent.includes("Mes Projets")) {
       // Création du nouveau fragment HTML à ajouter
       const modeEditionHtml = document.createElement('div');
       modeEditionHtml.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>mode edition';
 
       // Insertion du fragment juste après l'élément <h2>
       h2MesProjets.insertAdjacentElement('afterend', modeEditionHtml);
     }
   }

  // Fonction pour tenter de se connecter à l'API
  function login(credentials) {
    validateCredentials(credentials);
    return sendLoginRequest(credentials);
  }

  // Valide les identifiants de connexion
  function validateCredentials({ email, password }) {
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/)) {
      loginEmailError.innerHTML = "Veuillez entrer une adresse mail valide";
      return;
    }
    if (password.length < 5 || !password.match(/^[a-zA-Z0-9]+$/)) {
      loginMdpError.innerHTML =
        "Le mot de passe doit contenir au moins 5 caractères et uniquement des lettres et des chiffres";
      return;
    }
  }

  // Envoie une requête de connexion à l'API
  function sendLoginRequest(credentials) {
    return fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(credentials),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Échec de la connexion. Vérifiez vos identifiants.");
      }
      return response.json();
    });
  }
});