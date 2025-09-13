document.addEventListener("DOMContentLoaded", () => {
  const pickBtn = document.getElementById("pickBtn");
  const result = document.getElementById("result");

  
  fetch("countries_books.json")
    .then(response => response.json())
    .then(data => {
      pickBtn.addEventListener("click", () => {
      
        const countries = Object.keys(data);
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const books = data[randomCountry].books;

        
        result.innerHTML = `
          <div class="card fade-in">
            <h4>Your next country is:</h4>
            <h2>${randomCountry}</h2>
            ${
              books.length
                ? `<ul>${books.map(b => `<li>${b}</li>`).join("")}</ul>`
                : "<p class='text-danger'>⚠️ No books registered yet for this country.</p>"
            }
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("Error loading countries_books.json:", err);
      result.innerHTML = "<p class='text-danger'>Could not load book data.</p>";
    });
});
