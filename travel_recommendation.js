const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");

function resetSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("result").innerHTML = "";

    const resultsTitle = document.getElementById("resultsTitle");
    if (resultsTitle) {
        resultsTitle.style.display = "none";
    }
}

function searchGroup() {

    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    const resultDiv = document.getElementById("result");
    const resultsTitle = document.getElementById("resultsTitle");

    resultDiv.innerHTML = "";

    if (resultsTitle) {
        resultsTitle.style.display = "block";
    }

    if (input === "") {
        resultDiv.innerHTML = "<p>Please enter a search term.</p>";
        return;
    }

    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {

            let itemsToDisplay = [];

            /* =======================
               SHOW ALL TEMPLES
            ======================== */
            if (input === "temple" || input === "temples") {
                itemsToDisplay = data.temples;
            }

            /* =======================
               SHOW ALL BEACHES
            ======================== */
            else if (input === "beach" || input === "beaches") {
                itemsToDisplay = data.beaches;
            }

            /* =======================
               SHOW ALL COUNTRIES (ALL CITIES)
            ======================== */
            else if (input === "country" || input === "countries") {
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        itemsToDisplay.push(city);
                    });
                });
            }

            /* =======================
               SHOW SPECIFIC COUNTRY
            ======================== */
            else {
                data.countries.forEach(country => {
                    if (country.name.toLowerCase() === input) {
                        country.cities.forEach(city => {
                            itemsToDisplay.push(city);
                        });
                    }
                });
            }

            /* =======================
               DISPLAY RESULTS
            ======================== */
            if (itemsToDisplay.length === 0) {
                resultDiv.innerHTML = `
                    <div class="warning">
                        <h3>No results found.</h3>
                        <p>Please search beach, temple, country, or a valid country name.</p>
                    </div>
                `;
                return;
            }

            itemsToDisplay.forEach(item => {
                resultDiv.innerHTML += `
                    <div class="card">
                        <img src="./images/${item.imageUrl}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                `;
            });

        })
        .catch(error => {
            console.error("Error:", error);
            resultDiv.innerHTML = `
                <div class="warning">
                    <h3>Error loading data.</h3>
                </div>
            `;
        });
}

btnSearch.addEventListener("click", searchGroup);
btnReset.addEventListener("click", resetSearch);
