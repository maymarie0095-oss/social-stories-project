document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");

  let currentTheme = localStorage.getItem("theme") || "adult";

  document.body.classList.remove("adult-theme", "kids-theme");
  document.body.classList.add(currentTheme + "-theme");

  function updateButtonText() {
    if (themeToggle) {
      themeToggle.textContent =
        currentTheme === "adult" ? "Kids Mode" : "Adult Mode";
    }
  }

  updateButtonText();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.remove("adult-theme", "kids-theme");

      currentTheme = currentTheme === "adult" ? "kids" : "adult";

      document.body.classList.add(currentTheme + "-theme");
      localStorage.setItem("theme", currentTheme);

      updateButtonText();
    });
  }
});