// This is the password stored as Base64 text.
// Try decoding this to understand what the real password is.
const password_encoded = "bGV0bWVpbkBEVUNB";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");
const accessValue = document.getElementById("accessValue");
const successModalElement = document.getElementById("successModal");
const successModal = new bootstrap.Modal(successModalElement);

// When the form is submitted
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Read what the user typed into the password field.
  const typedPassword = document.getElementById("password").value;

  // Encode the typed password so we can compare encoded strings.
  const new_password = btoa(typedPassword);

  // Check if the password matches
  if (new_password === password_encoded) {
    message.textContent = "Authentication successful. Welcome, admin!";
    message.className = "login-message mt-4 mb-0 success";
    accessValue.textContent = "unlocked";
    accessValue.className = "unlocked";
    successModal.show();
  } else {
    message.textContent = "Authentication failed. Try again.";
    message.className = "login-message mt-4 mb-0 error";
    accessValue.textContent = "locked";
    accessValue.className = "";
  }
});
