'use strict'
var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = document.getElementById('countries');

document.getElementById('search').addEventListener('click', searchCountry);

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
        liElement.innerText = item.name;
        countriesList.appendChild(liElement);
    });
}