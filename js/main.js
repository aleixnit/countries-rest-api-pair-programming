let btnToggleDarkMode = document.querySelector("#btn-toggle-dark-mode");
const url = "https://restcountries.com/v3.1/all";
const countriesContainer = document.querySelector("#countries-selection-box");
const regionMenu = document.querySelector("#region-selector-menu");
const searchBar = document.querySelector('#input-field-country');
// let dataFromApi;

searchBar.addEventListener('input', async function(event) {
  const searchTerm = event.target.value;
  const countries = await getCountries();
  const filteredCountries = filterCountries(searchTerm, countries);
  
  // Aquí puedes realizar la lógica de filtrado según el término de búsqueda ingresado
  // Por ejemplo, puedes filtrar una lista de objetos y mostrar solo aquellos que coincidan con el término de búsqueda
  console.log('Nuevo término de búsqueda:', searchTerm);


});

function filterCountries(searchTerm, countries) {
  const filteredCountries = countries.filter(country => {
    const countryName = country.name.common.toLowerCase();
    const searchValue = searchTerm.toLowerCase();
    return countryName.includes(searchValue);
  });
  return filteredCountries;
}



async function getCountries() {
  
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    data.forEach(country => {
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
    </section>`
      // countryNode.innerHTML= `<img src="${country.flags.png} "></img>
      // <h2>${country.name.common}</h2> 
      // <p>Population: ${country.population.toLocaleString()} </p>
      // <p>Region: ${country.region}  </p>
      // <p>Capital: ${country.capital}  </p> `
      // countryNode.textContent = country.name.common;
      countriesContainer.appendChild(countryNode);
      console.log(country.name)
    });
}


getCountries()


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

window.onload = init();