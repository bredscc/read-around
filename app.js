document.addEventListener("DOMContentLoaded", async () => {
  const pickBtn = document.getElementById("pickBtn");
  const result = document.getElementById("result");
  const globe = document.querySelector(".background-globe");

  function createRipple(target, x, y) {
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const size = Math.max(rect.width, rect.height) * 1.4;
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (x - rect.left - size / 2) + "px";
    ripple.style.top = (y - rect.top - size / 2) + "px";
    target.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = "scale(1)";
      ripple.style.opacity = "0.14";
    });
    setTimeout(() => {
      ripple.style.opacity = "0";
      ripple.style.transform = "scale(1.3)";
    }, 260);
    setTimeout(() => ripple.remove(), 700);
  }

  function pokeGlobe() {
    if (!globe) return;
    globe.style.transform = "scale(1.03) rotate(6deg)";
    globe.style.transition = "transform 520ms cubic-bezier(.2,.9,.25,1)";
    setTimeout(() => {
      globe.style.transform = "";
    }, 520);
  }

  let data = null;
  try {
    data = await fetch("./countries_books.json").then(r => r.json());
  } catch (err) {
    console.error("Error loading countries_books.json:", err);
    renderError("Could not load book data");
    return;
  }

  pickBtn.addEventListener("pointerdown", (ev) => {
    createRipple(pickBtn, ev.clientX, ev.clientY);
  });

  pickBtn.addEventListener("click", () => {
    pickBtn.disabled = true;
    pickBtn.setAttribute("aria-disabled", "true");

    pokeGlobe();

    const randomCountry = getRandomKey(data);
    const books = data[randomCountry]?.books || [];
    renderCard(randomCountry, books);

    setTimeout(() => {
      pickBtn.disabled = false;
      pickBtn.removeAttribute("aria-disabled");
      pickBtn.focus();
    }, 520);
  });

  pickBtn.addEventListener("keyup", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      pickBtn.click();
    }
  });

  function getRandomKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  function renderCard(country, books) {
    result.innerHTML = `
      <article class="card" role="article" aria-label="Books from ${escapeHtml(country)}">
        <header class="card-header">
          <h4>
            <span class="material-icons" aria-hidden="true">flight_takeoff</span>
            Your next literary destination
          </h4>
          <h2>
            <span class="material-icons" aria-hidden="true">place</span>
            ${escapeHtml(country)}
          </h2>
        </header>
        ${
          books.length
            ? `
              <p class="books-intro" style="margin:6px 0 8px 0;">
                Discover these picks
              </p>
              <ul>
                ${books.map(b => `
                  <li>
                    <span class="material-icons" aria-hidden="true">menu_book</span>
                    <span>${escapeHtml(b)}</span>
                  </li>`).join("")}
              </ul>`
            : `
              <p class="text-muted" role="status">
                <span class="material-icons" aria-hidden="true">search_off</span>
                No books listed yet for this country
              </p>`
        }
      </article>
    `;

    const card = result.querySelector(".card");
    if (card) {
      card.tabIndex = -1;
      card.focus({ preventScroll: true });
      requestAnimationFrame(() => {
        setTimeout(() => card.classList.add("pop-in"), 15);
      });

      card.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") {
          pickBtn.focus();
        }
      });
    }
  }

  function renderError(message) {
    result.innerHTML = `
      <article class="card" role="alert">
        <p class="text-danger">
          <span class="material-icons" aria-hidden="true">error</span>
          ${escapeHtml(message)}
        </p>
      </article>
    `;
    const card = result.querySelector(".card");
    if (card) {
      card.classList.add("pop-in");
      card.tabIndex = -1;
      card.focus({ preventScroll: true });
    }
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str.replace(/[&<>"'`=\/]/g, function(s) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
      })[s];
    });
  }
});
