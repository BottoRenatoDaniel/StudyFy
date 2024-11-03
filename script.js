// Function to redirect to the registration page
function redirectToRegistration() {
    window.location.href = "register.html";
}

// Event listener for the "Próbáld ki most" button in the header
document.getElementById("tryNowButton").addEventListener("click", redirectToRegistration);

// Event listener for the "Próbáld ki most" button in the hero section
document.getElementById("regButton").addEventListener("click", redirectToRegistration);

// script.js

// Hirdetés bezárása
document.getElementById("close-ad").addEventListener("click", function() {
    document.getElementById("halloween-ad").style.display = "none";
});
