let btnToggleDarkMode = document.querySelector("#btn-toggle-dark-mode");
const url = "https://restcountries.com/v3.1/all";
const countriesContainer = document.querySelector("#countries-selection-box");
const regionMenu = document.querySelector("#region-selector-menu");
const searchBar = document.querySelector('#input-field-country');
let filteredCountries = [];

async function getCountries() {
  countriesContainer.innerHTML = '';

  // el ternario comprueba si hay algo en la variable filteredCountries. Si se evalua como falase (hay 0 paises), entonces hace el fetch
  const countries = filteredCountries.length ? filteredCountries : await fetchCountries();

  countries.forEach(country => {
    const countryNode = document.createElement("div");
    countryNode.classList.add("card");

    countryNode.innerHTML = `<section id="country-details" >
    <div id="country-details-container">
      <div>
        <img id="country-detail-flag" src="${country.flags.png}" alt="flag not loaded" />
      </div>

      <div class="country-detail-text">
        <h2 id="country-detail-name">${country.name.common}</h2>

        <div class="country-detail-text-container">
          <div class="text-container1">
            <p>
              <span>Population: </span>
              <span id="detail-population"> ${country.population.toLocaleString()}</span>
            </p>
            <p><span>Region: </span><span id="detail-region">${country.region}</span></p>
            <p><span>Capital: </span><span id="detail-capital">${country.capital}</span></p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

    countriesContainer.appendChild(countryNode);
  });
}

searchBar.addEventListener('input', async function(event) {
  const searchTerm = event.target.value;
  const countries = await fetchCountries();
  filteredCountries = filterCountries(searchTerm, countries);
  getCountries();
});

function filterCountries(searchTerm, countries) {
  const filteredCountries = countries.filter(country => {
    const countryName = country.name.common.toLowerCase();
    const searchValue = searchTerm.toLowerCase();
    return countryName.includes(searchValue);
  });
  return filteredCountries;
}

async function fetchCountries() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

regionMenu.addEventListener("change", async(event) => {
  const selectedRegion = event.target.value;
});

function toggleDarkMode() {
  document.querySelector("html").classList.toggle("dark-mode");
  btnToggleDarkMode.children[0].classList.toggle("bi-moon");
  btnToggleDarkMode.children[0].classList.toggle("bi-moon-fill");
}

function init() {
  btnToggleDarkMode.addEventListener("click", toggleDarkMode);
}

window.onload = function() {
  init();
  getCountries(); // Mostrar todos los países al cargar la página
};
