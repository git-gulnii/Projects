document.addEventListener("DOMContentLoaded", () => {
  const items = Array.isArray(window.ITEMS) ? window.ITEMS : [];

  const FAV_KEY = "fav_list";
  const WATCHLIST_KEY = "watchlist";
  const WATCHED_KEY = "watched";

  const getSet = (key) => new Set(JSON.parse(localStorage.getItem(key) || "[]"));
  const saveSet = (key, set) => localStorage.setItem(key, JSON.stringify([...set]));

  const grid = document.getElementById("grid");
  const empty = document.getElementById("empty");
  const info = document.getElementById("info");

  const q = document.getElementById("q");
  const genre = document.getElementById("genre");
  const minRating = document.getElementById("minRating");
  const sort = document.getElementById("sort");

  const toggleFav = document.getElementById("toggleFav");
  const toggleWatchlist = document.getElementById("toggleWatchlist");
  const toggleWatched = document.getElementById("toggleWatched");
  const clearAll = document.getElementById("clearAll");

  const required = { grid, empty, info, q, genre, minRating, sort, toggleFav, toggleWatchlist, toggleWatched, clearAll };
  for (const [k, v] of Object.entries(required)) {
    if (!v) {
      console.error("Missing element:", k);
      return;
    }
  }
  if (items.length === 0) {
    info.textContent = "No data found. Make sure data.js is loaded BEFORE app.js.";
    empty.style.display = "block";
    empty.textContent = "Fix: <script src='data.js'></script> then <script src='app.js'></script>";
    return;
  }

  let mode = "all";

  function setMode(nextMode) {
    mode = (mode === nextMode) ? "all" : nextMode;
    updateModeButtons();
    applyFilters();
  }

  function updateModeButtons() {
    toggleFav.textContent = mode === "fav" ? " Favorites: ON" : " Favorites Only";
    toggleWatchlist.textContent = mode === "watchlist" ? " Watchlist: ON" : " Watchlist Only";
    toggleWatched.textContent = mode === "watched" ? "Watched: ON" : " Watched Only";

    toggleFav.classList.toggle("primary", mode === "fav");
    toggleWatchlist.classList.toggle("primary", mode === "watchlist");
    toggleWatched.classList.toggle("primary", mode === "watched");
  }

  function initGenres() {
    const genres = ["All", ...new Set(items.map(x => x.genre))];
    genre.innerHTML = genres.map(g => `<option value="${g}">${g}</option>`).join("");
  }

  function applyFilters() {
    const query = q.value.trim().toLowerCase();
    const g = genre.value;
    const r = Number(minRating.value);

    const favs = getSet(FAV_KEY);
    const watchlist = getSet(WATCHLIST_KEY);
    const watched = getSet(WATCHED_KEY);

    let list = items.filter(x => {
      const okQuery = x.title.toLowerCase().includes(query);
      const okGenre = (g === "All") ? true : x.genre === g;
      const okRating = x.rating >= r;

      const okMode =
        mode === "all" ? true :
        mode === "fav" ? favs.has(x.id) :
        mode === "watchlist" ? watchlist.has(x.id) :
        watched.has(x.id);

      return okQuery && okGenre && okRating && okMode;
    });

    const s = sort.value;
    if (s === "rating_desc") list.sort((a,b)=>b.rating-a.rating);
    if (s === "rating_asc") list.sort((a,b)=>a.rating-b.rating);
    if (s === "title_asc") list.sort((a,b)=>a.title.localeCompare(b.title,"en"));

    render(list);
  }

  function render(list) {
    const favs = getSet(FAV_KEY);
    const watchlist = getSet(WATCHLIST_KEY);
    const watched = getSet(WATCHED_KEY);

    info.textContent = `${list.length} results • Favorites: ${favs.size} • Watchlist: ${watchlist.size} • Watched: ${watched.size}`;
    empty.style.display = list.length ? "none" : "block";

    grid.innerHTML = list.map(x => {
      const isFav = favs.has(x.id);
      const inWatchlist = watchlist.has(x.id);
      const isWatched = watched.has(x.id);

      return `
        <article class="card">
          <div class="poster" style="background-image:url('${x.poster || ""}')">
            <span class="tag">${x.type}</span>
            <span class="tag"> ${x.rating}</span>
          </div>

          <div class="body">
            <h3 class="title">${x.title}</h3>
            <div class="meta">${x.genre} • ${x.year}</div>
            <p class="desc">${x.desc}</p>

            <div class="row" style="flex-wrap:wrap;">
              <button class="${isFav ? "primary" : ""}" data-fav="${x.id}">
                ${isFav ? " Favorited" : " Add Favorite"}
              </button>

              <button class="${inWatchlist ? "primary" : ""}" data-watchlist="${x.id}">
                ${inWatchlist ? " In Watchlist" : "Watchlist"}
              </button>

              <button class="${isWatched ? "primary" : ""}" data-watched="${x.id}">
                ${isWatched ? " Watched" : " Mark Watched"}
              </button>

              <button data-detail="${x.id}">Details</button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    grid.querySelectorAll("[data-fav]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-fav"));
        const set = getSet(FAV_KEY);
        set.has(id) ? set.delete(id) : set.add(id);
        saveSet(FAV_KEY, set);
        applyFilters();
      });
    });

    grid.querySelectorAll("[data-watchlist]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-watchlist"));
        const set = getSet(WATCHLIST_KEY);
        set.has(id) ? set.delete(id) : set.add(id);
        saveSet(WATCHLIST_KEY, set);
        applyFilters();
      });
    });

    grid.querySelectorAll("[data-watched]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-watched"));
        const set = getSet(WATCHED_KEY);
        set.has(id) ? set.delete(id) : set.add(id);
        saveSet(WATCHED_KEY, set);
        applyFilters();
      });
    });

    grid.querySelectorAll("[data-detail]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-detail"));
        window.location.href = `detail.html?id=${id}`;
      });
    });
  }

  toggleFav.addEventListener("click", () => setMode("fav"));
  toggleWatchlist.addEventListener("click", () => setMode("watchlist"));
  toggleWatched.addEventListener("click", () => setMode("watched"));

  clearAll.addEventListener("click", () => {
    localStorage.removeItem(FAV_KEY);
    localStorage.removeItem(WATCHLIST_KEY);
    localStorage.removeItem(WATCHED_KEY);
    mode = "all";
    updateModeButtons();
    applyFilters();
  });

  q.addEventListener("input", applyFilters);
  genre.addEventListener("change", applyFilters);
  minRating.addEventListener("change", applyFilters);
  sort.addEventListener("change", applyFilters);

  initGenres();
  updateModeButtons();
  applyFilters();
});
