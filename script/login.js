// Billy Reyes - 2024396 - Act.1 Práctica Supervisada - IN6BV
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); 

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value; 

    localStorage.setItem("userEmail", email);  
    localStorage.setItem("userPassword", password);  

    window.location.href = "contactos.html"; 
});