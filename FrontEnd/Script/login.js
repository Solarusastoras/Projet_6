// Constante vers l'api //
const APIpath = "http://localhost:5678/api/";

// Récupération email,password,form //
let inputEmail = document.querySelector("#email");
let inputPassword = document.querySelector("#mdp");
let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userlogins = {
    // récup des login de l'utilisateur
    email: inputEmail.value,
    password: inputPassword.value,
  };

  fetch(APIpath + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userlogins),
  })
    // Message d'erreurs //
    .then((response) => {
      if (!response.ok) {
        let ExistingErrorContainer = document.querySelector(".error_container");
        if (ExistingErrorContainer) {
          form.removeChild(ExistingErrorContainer);
        }

        // Affichage Erreur //
        const errorContainer = document.createElement("div");
        errorContainer.classList.add("error_container");
        const connexionInput = form.querySelector('input[type="submit"]');
        form.insertBefore(errorContainer, connexionInput);

        if (response.status === 404 || response.status === 401) {
          errorContainer.innerText =
            "Erreur dans l’identifiant ou le mot de passe";
        }
      } else {
        return response.json();
      }
    })

    //Stockage  userId,token ET redirection //
    .then((data) => {
      localStorage.setItem("id", data.userId);
      localStorage.setItem("token", data.token);
      document.location.href = "./index.html";
    })
    .catch((error) => {
      console.log(error);
      npm;
    });
});
