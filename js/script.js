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
        .then(showCountriesList)
        .catch(function(err){
            alert(err);
        });
}

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    if (!resp.length) {
        var liElement = document.createElement('li');
        liElement.innerText = 'No data';
        countriesList.appendChild(liElement);
    } else {
    resp.forEach(function(item) {
        var liElement = document.createElement('li');
        var liContent = Mustache.render(template, item)
        liElement.innerHTML = liContent;
        countriesList.appendChild(liElement);
    });
}
}