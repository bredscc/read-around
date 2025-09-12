async function loadData() {
  const response = await fetch("countries_books.json");
  const data = await response.json();
  return data;
}

function pickRandomCountry(data) {
  const countries = Object.keys(data);
  const withBooks = countries.filter(
    (c) => data[c].books && data[c].books.length > 0
  );

  const pool = withBooks.length > 0 ? withBooks : countries;
  const country = pool[Math.floor(Math.random() * pool.length)];
  return { country, books: data[country].books };
}

document.getElementById("pickBtn").addEventListener("click", async () => {
  const data = await loadData();
  const { country, books } = pickRandomCountry(data);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<h2>${country}</h2>`;

  if (books.length > 0) {
    const list = books.map((b) => `<li>${b}</li>`).join("");
    resultDiv.innerHTML += `<ul>${list}</ul>`;
  } else {
    resultDiv.innerHTML += "<p>There are no books registered yet.</p>";
  }
});
