const contactos = {
    "Juan Pérez": {
        nombre: "Juan",
        apellidos: "Pérez",
        correo: "juan.perez@email.com",
        telefono: "123456789",
        direccion: "Av. Siempre Viva 742, Springfield, IL",
        fecha: "1985-06-15",
        oficio: "Ingeniero de Software"
    },
    "Ana Gómez": {
        nombre: "Ana",
        apellidos: "Gómez",
        correo: "ana.gomez@email.com",
        telefono: "987654321",
        direccion: "Calle Ficticia 123, Ciudad Real, España",
        fecha: "1992-11-23",
        oficio: "Diseñadora Gráfica"
    },
    "Carlos Rodríguez": {
        nombre: "Carlos",
        apellidos: "Rodríguez",
        correo: "carlos.rodriguez@email.com",
        telefono: "564738291",
        direccion: "Calle Libertad 456, Buenos Aires, Argentina",
        fecha: "1989-04-10",
        oficio: "Médico General"
    },
    "Laura Díaz": {
        nombre: "Laura",
        apellidos: "Díaz",
        correo: "laura.diaz@email.com",
        telefono: "876543210",
        direccion: "Calle Luna 789, Santiago, Chile",
        fecha: "1990-02-05",
        oficio: "Arquitecta"
    },
    "Pedro López": {
        nombre: "Pedro",
        apellidos: "López",
        correo: "pedro.lopez@email.com",
        telefono: "112233445",
        direccion: "Avenida Los Álamos 321, Lima, Perú",
        fecha: "1987-09-14",
        oficio: "Profesor de Matemáticas"
    }
};

function verDetalleContactos(nombreCompleto) {
    const contacto = contactos[nombreCompleto];

    if (contacto) {
        localStorage.setItem("contactoNombre", contacto.nombre);
        localStorage.setItem("contactoApellidos", contacto.apellidos);
        localStorage.setItem("contactoCorreo", contacto.correo);
        localStorage.setItem("contactoTelefono", contacto.telefono);
        localStorage.setItem("contactoDireccion", contacto.direccion);
        localStorage.setItem("contactoFecha", contacto.fecha);
        localStorage.setItem("contactoOficio", contacto.oficio);
    }

    window.location.href = "detalle_contacto.html"; 
}

window.onload = function() {
    var nombre = localStorage.getItem("contactoNombre");
    var apellidos = localStorage.getItem("contactoApellidos");
    var correo = localStorage.getItem("contactoCorreo");
    var telefono = localStorage.getItem("contactoTelefono");
    var direccion = localStorage.getItem("contactoDireccion");
    var fecha = localStorage.getItem("contactoFecha");
    var oficio = localStorage.getItem("contactoOficio");

    if (nombre && apellidos && correo && telefono && direccion && fecha && oficio) {
        document.getElementById("contactNombre").value = nombre;
        document.getElementById("contactApellidos").value = apellidos;
        document.getElementById("contactCorreo").value = correo;
        document.getElementById("contactTelefono").value = telefono;
        document.getElementById("contactDireccion").value = direccion;
        document.getElementById("contactFecha").value = fecha;
        document.getElementById("contactOficio").value = oficio;
    } else {
        alert("No se encontraron los datos del contacto.");
    }
};

function regresar() {
    window.location.href = "contactos.html";
}