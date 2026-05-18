let currentPage = 0;
let currentStory = [];
const character = JSON.parse(localStorage.getItem("currentCharacter"));

const storySelect = document.getElementById("storySelect");
const startStory = document.getElementById("startStory");
const storyViewer = document.getElementById("storyViewer");
const storyText = document.getElementById("storyText");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const printBtn = document.getElementById("printBtn");

if (!character) {
  storyText.innerHTML = "<p>Please create or select a character first.</p>";
  storyViewer.style.display = "block";
}

startStory.addEventListener("click", () => {
  const selectedStory = storySelect.value;
  currentStory = stories[selectedStory].map(sentence =>
    fillTemplate(sentence, character)
  );

  currentPage = 0;
  storyViewer.style.display = "block";
  showPage();
});

function showPage() {
  storyText.innerHTML = `
    <div class="story-page">
      <p>${currentStory[currentPage]}</p>
    </div>
  `;

  backBtn.disabled = currentPage === 0;
  nextBtn.textContent =
    currentPage === currentStory.length - 1 ? "Restart" : "Next";
}

nextBtn.addEventListener("click", () => {
  if (currentPage === currentStory.length - 1) {
    currentPage = 0;
  } else {
    currentPage++;
  }

  showPage();
});

backBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    showPage();
  }
});

printBtn.addEventListener("click", () => {
  window.print();
});