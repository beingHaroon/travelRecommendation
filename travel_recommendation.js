const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");

function resetSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("result").innerHTML = "";
}

function searchGroup() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p class="text-with-background">YOUR SEARCH RESULTS</p>';
    fetch('travel_recommendation_api.json').then(response => response.json()).then(data => {
        if (input.includes("templ")) {
            const temples = data.temples;
            if (temples) {
                temples.forEach(item => {
                    addItem(item, resultDiv);
                });                
            } else {
                resultDiv.innerHTML += '<div><h3 class="warning">Temples not found.</h3></div>';        
            }
        }
        if (input.includes("beach")) {
            const beaches = data.beaches;
            if (beaches) {
                beaches.forEach(item => {
                    addItem(item, resultDiv);
                });                
            } else {
                resultDiv.innerHTML += '<div><h3 class="warning">Beaches not found.</h3></div>';        
            }
        }
        if (input.includes("count")) {
            const countries = data.countries;
            if (countries) {
                countries.forEach(country => {
                    country.cities.forEach(item => {
                        addItem(item, resultDiv);
                    })                                        
                });                
            } else {
                resultDiv.innerHTML += '<div><h3 class="warning">Countries not found.</h3></div>';        
            }
        }
        if (input === "" && !input.includes("templ") && !input.includes("beach") && !input.includes("count")){
            resultDiv.innerHTML += '<div><h3 class="warning">Your search returned no results.<br>Search options are limited to countries, beaches and temples.<br>For your search you need enter at least 5 first characters.</h3></div>';
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = '<div><h3 class="warning">An error occurred while fetching data.</h3></div>';
    });
}

function addItem(item, resultDiv) {
    const name = item.name;    
    const timeZone = item.timeZone
    const timeOptions = { timeZone: timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const time = new Date().toLocaleTimeString('en-US', timeOptions);
    const description = item.description;
    const imageUrl = item.imageUrl;
    resultDiv.innerHTML += `<h3 style="padding-top: 40px;">${name}</h3>`;
    resultDiv.innerHTML += `<p>${description}</p>`;
    resultDiv.innerHTML += `<img style="width: 100%" src="./images/${imageUrl}" alt="hjh">`;
    resultDiv.innerHTML += `<p>Current time in ${name}: ${time}</p>`;

}

btnSearch.addEventListener('click', searchGroup);
btnReset.addEventListener('click', resetSearch);