document.addEventListener("DOMContentLoaded", async () => {
  const pickBtn = document.getElementById("pickBtn");
  const result = document.getElementById("result");

  let data = null;
  try {
    data = await fetch("./countries_books.json").then(r => r.json());
  } catch (err) {
    console.error("Error loading countries_books.json:", err);
    renderError("Could not load book data");
    return;
  }

  pickBtn.addEventListener("click", () => {
    const randomCountry = getRandomKey(data);
    const books = data[randomCountry]?.books || [];
    renderCard(randomCountry, books);
  });

  function getRandomKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  function renderCard(country, books) {
    result.innerHTML = `
      <article class="card fade-in">
        <header class="card-header">
          <h4>
            <span class="material-icons" aria-hidden="true">flight_takeoff</span>
            Your next literary destination
          </h4>
          <h2>
            <span class="material-icons" aria-hidden="true">place</span>
            ${country}
          </h2>
        </header>
        ${
          books.length
            ? `
              <p class="books-intro">
                <span class="material-icons" aria-hidden="true">auto_stories</span>
                Discover these romance novels
              </p>
              <ul>
                ${books
                  .map(
                    (b) => `
                    <li>
                      <span class="material-icons" aria-hidden="true">menu_book</span>
                      <span>${b}</span>
                    </li>`
                  )
                  .join("")}
              </ul>`
            : `
              <p class="text-muted">
                <span class="material-icons" aria-hidden="true">search_off</span>
                No books listed yet for this country
              </p>`
        }
      </article>
    `;
  }

  function renderError(message) {
    result.innerHTML = `
      <article class="card">
        <p class="text-danger">
          <span class="material-icons" aria-hidden="true">error</span>
          ${message}
        </p>
      </article>
    `;
  }
});
