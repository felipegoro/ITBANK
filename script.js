const usuarios = {
    usuario1: "password1",
    usuario2: "password2",
};

function validarInicioSesion(username, password) {
    if (usuariosValidos.hasOwnProperty(username)) {
        if (usuariosValidos[username] === password) {
            return true; 
        }
    }
    return false; 
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (validarInicioSesion(username, password)) {
        window.location.href = "index.html";
    } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
});