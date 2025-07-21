var themeBtn = document.getElementById("themeBtn");
var le_body = document.body;
themeBtn === null || themeBtn === void 0 ? void 0 : themeBtn.addEventListener("click", function () {
    le_body.classList.toggle("dark-theme");
});
