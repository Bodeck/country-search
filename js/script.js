'use strict'
var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = document.getElementById('countries');

document.getElementById('search').addEventListener('click', searchCountry);
document.getElementById('country-name').addEventListener('keypress', function(event) {
    if (event.code == 'Enter') searchCountry()
});

var template = document.getElementById('country-template').innerHTML;
Mustache.parse(template);

function searchCountry() {
    var countryName = document.getElementById('country-name').value;
    if (!countryName.length) {countryName = 'Poland'};
    fetch(url + countryName)
        .then(function(response){
            return response.json();
        })
        .then(showCountriesList);
}

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    resp.forEach(function(item) {
        var liElement = document.createElement('li');
        var liContent = Mustache.render(template, {
            name: item.name,
            capital: item.capital,
            population: item.population,
            area: item.area,
            nativeName: item.nativeName,
            altSpellings: item.altSpellings,
            languages: item.languages
        })
        liElement.innerHTML = liContent;
        
        countriesList.appendChild(liElement);
    });
}