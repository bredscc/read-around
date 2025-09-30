document.addEventListener("DOMContentLoaded", () => {
  const pickBtn = document.getElementById("pickBtn");
  const result = document.getElementById("result");

  fetch("./countries_books.json")
    .then(response => response.json())
    .then(data => {
      pickBtn.addEventListener("click", () => {
        const countries = Object.keys(data);
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const books = data[randomCountry].books;

        result.innerHTML = `
          <div class="card fade-in">
            <div class="card-header">
              <h4>
                <span class="material-icons">flight_takeoff</span>
                Your next literary destination
              </h4>
              <h2>
                <span class="material-icons">place</span>
                ${randomCountry}
              </h2>
            </div>
            ${
              books.length
                ? `
                  <p class="books-intro">
                    <span class="material-icons">auto_stories</span>
                    Discover these romance novels
                  </p>
                  <ul>
                    ${books.map(b => `
                      <li>
                        <span class="material-icons">menu_book</span>
                        <span>${b}</span>
                      </li>
                    `).join("")}
                  </ul>`
                : `
                  <p class="text-muted">
                    <span class="material-icons">search_off</span>
                    No books listed yet for this country
                  </p>`
            }
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("Error loading countries_books.json:", err);
      result.innerHTML = `
        <div class="card">
          <p class="text-danger">
            <span class="material-icons">error</span>
            Could not load book data
          </p>
        </div>
      `;
    });
});