// Récupération email, password, form
let inputEmail = document.querySelector("#email");
let inputPassword = document.querySelector("#mdp");
let formConnexion = document.querySelector("form");

function afficherMessageErreur(message) {
  console.error(message);
}

formConnexion.addEventListener("submit", async (event) => {
  event.preventDefault()

  const userLogin = {
    email: inputEmail.value, 
    password: inputPassword.value, 
  }
  const userBodyValue = JSON.stringify(userLogin)
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"},
    body: userBodyValue
  })
  .then(res => {
    if(res.status === 200) {
        return res.json()
    } else {
        throw new Error("Erreur dans l'identifiant ou le mot de passe")
        }
})
.then(data => {
    console.log(data.token)
    localStorage.setItem("token", data.token)
    location.href="./index.html"
})
.catch(error => {
  afficherMessageErreur(error.message);
})
})
