let allCharacters = [];
let currentStatusFilter = "all";

async function fetchCharacters() {
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character"
    );
    const data = await response.json();

    if (data.results) {
      allCharacters = data.results;
      displayCharacters(allCharacters);
    } else {
      throw new Error("No se pudieron cargar los personajes");
    }
  } catch (error) {
    console.error("Error fetching characters:", error);
    document.getElementById("charactersLoading").style.display = "none";
    document.getElementById("charactersError").style.display = "flex";
  }
}

function displayCharacters(characters) {
  const charactersGrid = document.getElementById("charactersGrid");
  charactersGrid.innerHTML = "";
  document.getElementById("charactersLoading").style.display = "none";

  characters.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.className = "character-card";
    characterCard.innerHTML = `
              <img class="character-image" src="${
                character.image
              }" alt="${character.name}">
              <div class="character-info">
                  <h3 class="character-name">${character.name}</h3>
                  <span class="character-species">${
                    character.species
                  }</span>
                  <div class="character-status">
                      <span class="status-icon ${character.status.toLowerCase()}"></span>
                      ${character.status} - ${character.gender}
                  </div>
              </div>
          `;

    charactersGrid.appendChild(characterCard);
  });
}

async function fetchLocations() {
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/location"
    );
    const data = await response.json();

    if (data.results) {
      displayLocations(data.results);
    } else {
      throw new Error("No se pudieron cargar las ubicaciones");
    }
  } catch (error) {
    console.error("Error fetching locations:", error);
    document.getElementById("locationsLoading").style.display = "none";
    document.getElementById("locationsError").style.display = "flex";
  }
}

function displayLocations(locations) {
  const locationsGrid = document.getElementById("locationsGrid");
  document.getElementById("locationsLoading").style.display = "none";

  locations.forEach((location) => {
    const locationCard = document.createElement("div");
    locationCard.className = "location-card";
    locationCard.innerHTML = `
              <h3 class="location-name">${location.name}</h3>
              <p class="location-type">
                  <i class="fas fa-globe"></i> Tipo: ${location.type}
              </p>
              <p class="location-dimension">
                  <i class="fas fa-compass"></i> Dimensión: ${location.dimension}
              </p>
              <p><i class="fas fa-users"></i> Residentes: ${location.residents.length}</p>
          `;

    locationsGrid.appendChild(locationCard);
  });
}


function filterCharacters(status) {
  if (status === "all") {
    displayCharacters(allCharacters);
  } else {
    const filteredCharacters = allCharacters.filter(
      (character) => character.status.toLowerCase() === status
    );
    displayCharacters(filteredCharacters);
  }
}

function initFilters() {
  const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Agregar clase active al botón clickeado
      button.classList.add("active");

      currentStatusFilter = button.dataset.status;
      filterCharacters(currentStatusFilter);
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });
}

document.getElementById("exploreBtn").addEventListener("click", () => {
  document
    .getElementById("characters")
    .scrollIntoView({ behavior: "smooth" });
});

function init() {
  fetchCharacters();
  fetchLocations();
  initFilters();
  initSmoothScroll();
}

document.addEventListener("DOMContentLoaded", init);