document.addEventListener("DOMContentLoaded", () => {
  const items = Array.isArray(window.ITEMS) ? window.ITEMS : [];

  const FAV_KEY = "fav_list";
  const WATCHLIST_KEY = "watchlist";
  const WATCHED_KEY = "watched";

  const getSet = (key) => new Set(JSON.parse(localStorage.getItem(key) || "[]"));
  const saveSet = (key, set) => localStorage.setItem(key, JSON.stringify([...set]));

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const item = items.find(x => x.id === id);
  const card = document.getElementById("detailCard");

  if (!card) return;

  if (!item) {
    card.innerHTML = "<p>Item not found.</p><a href='index.html' class='back-btn'>⬅ Back to website</a>";
    return;
  }

  const favs = getSet(FAV_KEY);
  const watchlist = getSet(WATCHLIST_KEY);
  const watched = getSet(WATCHED_KEY);

  const isFav = favs.has(item.id);
  const inWatchlist = watchlist.has(item.id);
  const isWatched = watched.has(item.id);

  card.innerHTML = `
    <div class="detail-hero" style="background-image:url('${item.poster || ""}')"></div>

    <h1>${item.title}</h1>
    <p class="meta">${item.type} • ${item.genre} • ${item.year}</p>
    <p class="desc">${item.desc}</p>

    <p><strong>Rating:</strong>  ${item.rating}</p>

    <div class="row" style="flex-wrap:wrap; margin-top:10px;">
      <button id="favBtn" class="${isFav ? "primary" : ""}">
        ${isFav ? " Favorited" : "Add Favorite"}
      </button>

      <button id="wlBtn" class="${inWatchlist ? "primary" : ""}">
        ${inWatchlist ? " In Watchlist" : " Watchlist"}
      </button>

      <button id="watchedBtn" class="${isWatched ? "primary" : ""}">
        ${isWatched ? "Watched" : " Mark Watched"}
      </button>
    </div>

    <div style="margin-top:12px;">
      <a href="index.html" class="back-btn">⬅ Back to website</a>
    </div>
  `;

  const favBtn = document.getElementById("favBtn");
  const wlBtn = document.getElementById("wlBtn");
  const watchedBtn = document.getElementById("watchedBtn");

  favBtn.addEventListener("click", () => {
    const set = getSet(FAV_KEY);
    set.has(item.id) ? set.delete(item.id) : set.add(item.id);
    saveSet(FAV_KEY, set);

    const now = set.has(item.id);
    favBtn.className = now ? "primary" : "";
    favBtn.textContent = now ? " Favorited" : " Add Favorite";
  });

  wlBtn.addEventListener("click", () => {
    const set = getSet(WATCHLIST_KEY);
    set.has(item.id) ? set.delete(item.id) : set.add(item.id);
    saveSet(WATCHLIST_KEY, set);

    const now = set.has(item.id);
    wlBtn.className = now ? "primary" : "";
    wlBtn.textContent = now ? " In Watchlist" : " Watchlist";
  });

  watchedBtn.addEventListener("click", () => {
    const set = getSet(WATCHED_KEY);
    set.has(item.id) ? set.delete(item.id) : set.add(item.id);
    saveSet(WATCHED_KEY, set);

    const now = set.has(item.id);
    watchedBtn.className = now ? "primary" : "";
    watchedBtn.textContent = now ? " Watched" : " Mark Watched";
  });
});
