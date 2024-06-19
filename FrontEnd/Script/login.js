// Récupération email, password, form
let inputEmail = document.querySelector("#email");
let inputPassword = document.querySelector("#mdp");
let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: inputEmail.value,
      password: inputPassword.value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        let ExistingErrorContainer = document.querySelector(".error_container");
        if (ExistingErrorContainer) {
          form.removeChild(ExistingErrorContainer);
        }

        const errorContainer = document.createElement("div");
        errorContainer.classList.add("error_container");
        const connexionInput = form.querySelector('input[type="submit"]');
        form.insertBefore(errorContainer, connexionInput);

        if (response.status === 404 || response.status === 401) {
          errorContainer.innerText = "Erreur dans l’identifiant ou le mot de passe";
        }
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data) {
        localStorage.setItem("id", data.userId);
        localStorage.setItem("token", data.token);
        console.log("Token:", data.token); 
        console.log("L'utilisateur est connecté.");
        document.location.href = "./index.html";
        
        function afficherModale() {
          // Ajoute une classe CSS aux éléments pour les rendre visibles
          elementEditionMode.classList.add("visible");
          buttonEdition.classList.add("visible");
          console.log("Modale affichée");
        }
       
      }
    })
    .catch((error) => {
      console.log(error);
    });
    
    function removeToken() {
      localStorage.removeItem("token");
    }
    window.addEventListener("unload", removeToken);
});