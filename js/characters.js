let savedCharacters = JSON.parse(localStorage.getItem("characters")) || [];

// Update saved characters list with Select + Delete buttons
function updateSavedList() {
  const list = document.getElementById("savedList");
  list.innerHTML = ""; // clear old list

  savedCharacters.forEach((char, index) => {
    const li = document.createElement("li");
    li.textContent = char.name + " (" + char.pronouns + ") ";

    // Select button
    const selectBtn = document.createElement("button");
    selectBtn.textContent = "Select";
    selectBtn.onclick = () => loadCharacter(char);
    li.appendChild(selectBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "5px";
    deleteBtn.onclick = () => {
      if (confirm(`Delete ${char.name}?`)) {
        deleteCharacter(index);
      }
    };
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

// Save Character
document.getElementById("saveCharacter").addEventListener("click", () => {
  if (savedCharacters.length >= 3) {
    alert("Maximum of 3 characters reached.");
    return;
  }

  const character = {
    name: document.getElementById("name").value,
    pronouns: document.getElementById("pronouns").value,
    parentWord: document.getElementById("parentWord").value,
    skinTone: document.getElementById("skinTone").value,
    hairStyle: document.getElementById("hairStyle").value,
    hairColor: document.getElementById("hairColor").value,
    shirtColor: document.getElementById("shirtColor").value
  };

  savedCharacters.push(character);
  localStorage.setItem("characters", JSON.stringify(savedCharacters));
  updateSavedList();
  updatePreview(character);
});

// Load Character -- 
function loadCharacter(char) {
  document.getElementById("name").value = char.name;
  document.getElementById("pronouns").value = char.pronouns;
  document.getElementById("parentWord").value = char.parentWord;
  document.getElementById("skinTone").value = char.skinTone;
  document.getElementById("hairStyle").value = char.hairStyle;
  document.getElementById("hairColor").value = char.hairColor;
  document.getElementById("shirtColor").value = char.shirtColor;
  updatePreview(char);
}

// Delete Character
function deleteCharacter(index) {
  savedCharacters.splice(index, 1); // remove from array
  localStorage.setItem("characters", JSON.stringify(savedCharacters)); // update localStorage
  updateSavedList(); // refresh list

  // Reset preview if deleted character was displayed
  const currentName = document.getElementById("name").value;
  if (savedCharacters.every(c => c.name !== currentName)) {
    document.getElementById("spritePreview").innerHTML = "<div class='placeholder'>Your character will appear here</div>";
  }
}

// Update Preview (placeholder text for now; replace with your sprite layers)
function updatePreview(char) {

  const short_hairs = ["sm_str_bld", "sm_str_red", "sm_str_brwn", "sm_str_blk", "sm_curl_bld", "sm_curl_red", "sm_curl_brwn", "sm_curl_blk"];
  const long_hairs = ["lg_str_bld", "lg_str_red", "lg_str_brwn", "lg_str_blk", "lg_curl_bld", "lg_curl_red", "lg_curl_brwn", "lg_curl_blk"];
  const shirts = ["reg_blue", "reg_red", "reg_grn", "reg_yel", "reg_pnk", "reg_orn"];
  const bodies = ["standing_light", "standing_med", "standing_dark"];
  const heads = ["light_head", "med_head", "drk_head"];

  //everything is *8 of the original size to maintain scaling
  const preview = document.getElementById("spritePreview");
  preview.innerHTML = `
    <div class="sprite-layer" style="position: relative; width: 300px; height: 300px;">
        <img src="assets/character sprites/body/${char.skinTone}.png" alt="Body" width="190" height="310" style="position: absolute; top: 0%; left: 5%;">
        <img src="assets/character sprites/shirt/${char.shirtColor}.png" alt="Shirt" width="190" height="310" style="position: absolute; top: 0%; left: 5%;">
        <img src="assets/character sprites/hair/${char.hairStyle}${char.hairColor}.png" alt="Hair" width="190" height="310" style="position: absolute; top: 0%; left: 5%;">
    </div>
  `;
}

function getChildName() {
    const childName = document.getElementById("name").value;
    const preview = document.getElementById("spritePreview");
    
    if (childName) {
        preview.innerHTML = `
            <p>${childName}</p>
        `;
    } else {
        preview.innerHTML = "<div class='placeholder'>Select or create a character first</div>";
    }
}

// Initialize list on page load
updateSavedList();