/* show and close contact section */
function toggleContact() {
  document.querySelector(".contact-section").classList.toggle("show-contact");
}

[...document.getElementsByClassName("contact-btn")].forEach(
  (e) => (e.onclick = toggleContact)
);

document.querySelector(".form-overlay").onclick = toggleContact;

document.getElementById('close-contact').addEventListener('click', toggleContact)