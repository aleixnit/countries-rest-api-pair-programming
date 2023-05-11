let btnToggleDarkMode = document.querySelector("#btn-toggle-dark-mode");
const url = "https://restcountries.com/v3.1/all";
const countriesContainer = document.querySelector("#countries-selection-box") 
const regionMenu = document.querySelector("#region-selector-menu")




async function getCountries() {
  
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    data.forEach(country => {
      const countryNode = document.createElement("div");
      countryNode.classList.add("countries");
      countryNode.innerHTML= `<img src="${country.flags.png} "></img>
      <h2>${country.name.common}</h2> 
      <p>Population: ${country.population.toLocaleString()} </p>
      <p>Region: ${country.region}  </p>
      <p>Capital: ${country.capital}  </p> `
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