document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#formLogin");
  const loginButton = document.querySelector("#login");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#mdp");
  const loginEmailError = document.querySelector("#loginEmailError");
  const loginMdpError = document.querySelector("#loginMdpError");

  // Vérification de la connexion de l'utilisateur
  const token = localStorage.getItem("token");
  console.log(localStorage.getItem("token")); // Affiche la valeur du token dans la console
  if (token) {
    loginButton.textContent = "Logout";
    loginButton.addEventListener("click", function () {
      localStorage.removeItem("token");
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    loginEmailError.innerHTML = "";
    loginMdpError.innerHTML = "";

    const email = emailInput.value;
    const password = passwordInput.value;

    // Appel à la nouvelle fonction login avec un objet contenant email et password
    login({ email, password })
      .then((result) => {
        console.log(result);
        if (result.error || result.message) {
          const p = document.createElement("p");
          p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
          loginMdpError.appendChild(p);
        } else if (result.token) {
          localStorage.setItem("token", result.token);
          window.location.href = "../index.html";
          document.querySelector(".edition_mode").style.display = "block";
        }
      })
      .catch((error) => console.log(error));
  });

  // Nouvelle définition de la fonction login
  function login(id) {
    console.log(id);
    loginEmailError.innerHTML = "";
    loginMdpError.innerHTML = "";
    if (!id.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
      const p = document.createElement("p");
      p.innerHTML = "Veuillez entrer une adresse mail valide";
      loginEmailError.appendChild(p);
      return;
    }
    if (id.password.length < 5 || !id.password.match(/^[a-zA-Z0-9]+$/g)) {
      const p = document.createElement("p");
      p.innerHTML =
        "Le mot de passe doit contenir au moins 5 caractères et uniquement des lettres et des chiffres";
      loginMdpError.appendChild(p);
      return;
    } else {
      return fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(id),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Échec de la connexion. Vérifiez vos identifiants.");
        }
        return response.json();
      });
    }
  }
});

//Blocage d’une requête multiorigine (Cross-Origin Request) : la politique « Same Origin » ne permet pas de consulter la ressource distante située sur http://localhost:5678/api/users/login. Raison : échec de la requête CORS. Code d’état : (null).

//TypeError: NetworkError when attempting to fetch resource.
