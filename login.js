const usuarios = {
    usuario1: "password1",
    usuario2: "password2",
};

function validarInicioSesion(username, password) {
    if (usuarios.hasOwnProperty(username)) {
        if (usuarios[username] === password) {
            return true; 
        }
    }
    
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (validarInicioSesion(username, password)) {
        window.location.href = "index.html";

        console.log("funca");
    } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
});

