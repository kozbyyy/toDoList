const logButton = document.querySelector(".loginButton");
const container = document.querySelector(".container");

document.querySelector(".loginButton").addEventListener("click", function(){
    loginUtente();
});

document.querySelector(".registerButton").addEventListener("click", function () {
  registraUtente();
});

function registraUtente() {
    const usernameInput = document.getElementById("usernameBar").value;
    const passwordInput = document.getElementById("passwordBar").value;
    if (usernameInput === "" || passwordInput === "") {
    showMessage("Metti le credenziali richieste per effettuare la registrazione");
    return;
  } else if (passwordInput.length < 6) {
    showMessage("La password è troppo corta");
    return;
  } else {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === usernameInput) {
        showMessage("Questo username esiste già, scegline un altro.");
        return;
      }
    }
    /*create user id and assign it to every user that registers*/
    const lastUserId = ;

    const newUser = {
      username: usernameInput,
      password: passwordInput,
      userId: ; 
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    showMessage("L'utente è stato registrato con successo");
  }
}

function loginUtente(){
    const usernameInput = document.getElementById("usernameBar").value;
    const passwordInput = document.getElementById("passwordBar").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === usernameInput && users[i].password === passwordInput) {
        localStorage.setItem("currentUser", usernameInput);
        showMessage("Login effettuato con successo!");
        window.setTimeout(() => {
          window.location.href = "todopage.html";
        }, 2200);
      }
    }
    
    showMessage("Errore nel login: username o password non corretti.");
}

function showMessage(message) {
  let messageWarning = document.createElement("p");
  messageWarning.textContent = message;
  if (container && logButton) {
    container.insertBefore(messageWarning, logButton);
  } else {
    document.body.appendChild(messageWarning);
  }

  window.setTimeout(() => {
    messageWarning.remove();
  }, 6000);
}