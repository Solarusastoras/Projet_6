// Fonction de connexion
async function login(user) {
  loginEmailError.innerHTML = "";
  loginMdpError.innerHTML = "";

  // Vérification de l'email
  if (!user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
      const p = document.createElement("p");
      p.innerHTML = "Veuillez entrer une addresse mail valide";
      loginEmailError.appendChild(p);
      return;
  }

  // Vérification du mot de passe
  if (user.password.length < 5 && !user.password.match(/^[a-zA-Z0-9]+$/g)) {
      const p = document.createElement("p");
      p.innerHTML = "Veuillez entrer un mot de passe valide";
      loginMdpError.appendChild(p);
      return;
  }

  try {
      const response = await fetch('http://localhost:5678/api/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(user)
      });

      const result = await response.json();

      // Si couple email/mdp incorrect
      if (result.error || result.message) {
          const p = document.createElement("p");
          p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
          loginMdpError.appendChild(p);
      // Si couple email/mdp correct
      } else if (result.token) {
          localStorage.setItem("token", result.token);
          window.location.href = "../FrontEnd/index.html";
      }
  } catch (error) {
      console.log(error);
  }
}