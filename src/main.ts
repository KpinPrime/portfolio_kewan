const themeBtn = document.getElementById("themeBtn");
const le_body = document.body;

themeBtn?.addEventListener("click", () => {
  le_body.classList.toggle("dark-theme");
});
