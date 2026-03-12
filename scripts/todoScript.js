const container = document.getElementById('container');
const box = document.getElementById('box');
const currentUser = localStorage.getItem('currentUser');

// Se non c'è un utente loggato, rimanda alla pagina di login
if (!currentUser) {
    window.location.href = "loginHome.html";
}

function getAllTasks() {
    return JSON.parse(localStorage.getItem('allTasks')) || {};
}

function saveAllTasks(allTasks) {
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

/* Carica le task salvate al caricamento della pagina */
function loadTasks() {
    const allTasks = getAllTasks();
    const savedTasks = allTasks[currentUser] || [];
    savedTasks.forEach(taskText => createTaskElement(taskText));
}

/* Salva tutte le task correnti nel localStorage */
function saveTasks() {
    const labels = container.querySelectorAll('.item label');
    const tasks = [];
    labels.forEach(label => {
        tasks.push(label.textContent);
    });
    const allTasks = getAllTasks();
    allTasks[currentUser] = tasks;
    saveAllTasks(allTasks);
}

/* Crea e aggiunge un elemento task al DOM */
function createTaskElement(text) {
    const item = document.createElement('div');
    item.className = 'item';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const label = document.createElement('label');
    label.textContent = text;
    item.appendChild(checkbox);
    item.appendChild(label);
    container.appendChild(item);
}

/* Controlla se è vuoto e crea un nuovo elemento */
function nuovoElemento() {
    const inputElement = document.getElementById("inputBar");
    let getStringFromInput = inputElement.value.trim();
    if (getStringFromInput === "") {
        showMessage("Please enter a task before clicking the button.");
    } else {
        createTaskElement(getStringFromInput);
        saveTasks(); // salva dopo aver aggiunto
        showMessage("Task added: " + getStringFromInput);
        inputElement.value = "";
    }
}

function showMessage(message) {
    let messageWarning = document.createElement('h3');
    messageWarning.textContent = message;
    document.body.insertBefore(messageWarning, box);
    window.setTimeout(() => {
        messageWarning.remove();
    }, 3000);
}

/* Event listener per il bottone */
document.querySelector(".addButton")
    .addEventListener("click", function () {
        nuovoElemento();
    });

// Logout: rimuove l'utente corrente e torna alla pagina di login
const logoutButton = document.querySelector(".logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem('currentUser');
        window.location.href = "loginHome.html";
    });
}

/* Event listener per ogni checkbox (anche quelle create dopo) */
container.addEventListener("change", (event) => {
    const target = event.target;
    if (target.checked === true) {
        const item = target.closest(".item");
        item.remove();
        saveTasks(); // salva dopo aver rimosso
    }
});

/* Carica le task salvate all'avvio */
loadTasks();