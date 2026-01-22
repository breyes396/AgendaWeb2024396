window.onload = function() {
    var email = localStorage.getItem("userEmail");
    var password = localStorage.getItem("userPassword");

    var nombre = "Billy";
    var apellidos = "Reyes"; 
    var telefono = "12878909"; 
    var direccion = "6a. Avenida 13-54, Zona 7, Colonia Landívar, Ciudad de Guatemala, Guatemala"; 
    var fechaNacimiento = "2007-11-29"; 
    var oficio = "Estudiante"; 

    document.getElementById("userNombre").value = nombre;
    document.getElementById("userApellidos").value = apellidos;
    document.getElementById("userTelefono").value = telefono;
    document.getElementById("userDireccion").value = direccion;
    document.getElementById("userFecha").value = fechaNacimiento;
    document.getElementById("userOficio").value = oficio;

    document.getElementById("userCorreo").value = email;
    document.getElementById("userContraseña").value = password ? "********" : "No disponible"; 
};

function regresar() {
    window.location.href = "contactos.html"; 
}

function cerrarSesion() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    window.location.href = "login.html";
}
