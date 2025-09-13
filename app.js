fetch("countries_books.json")
  .then(response => response.json())
  .then(data => {
    const pickBtn = document.getElementById("pickBtn");
    const result = document.getElementById("result");

    pickBtn.addEventListener("click", () => {
      const countries = Object.keys(data);
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      const books = data[randomCountry].books;

      result.innerHTML = `
        <h4 class="text-muted mb-3">Your next country is:</h4>
        <h2>${randomCountry}</h2>
        ${
          books.length
            ? `<ul>${books.map(b => `<li>${b}</li>`).join("")}</ul>`
            : "<p class='text-danger'>⚠️ No books registered yet for this country.</p>"
        }
      `;
    });
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });
