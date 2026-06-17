let videos = [];

const container = document.getElementById("services-container");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

fetch("/api/videos")
  .then((response) => response.json())
  .then((data) => {
    videos = data;
    displayVideos(videos);
  })
  .catch((error) => {
    console.error("Error loading videos:", error);
    container.innerHTML = "<p>Videos could not be loaded.</p>";
  });

function displayVideos(list) {
  container.innerHTML = "";

  list.forEach((video) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <iframe src="${video.embed}" title="${video.title}" allowfullscreen></iframe>
      <div class="card-content">
        <h3>${video.title}</h3>
        <p class="category">Category: ${video.category}</p>
        <p>${video.description}</p>
        <p><strong>Level:</strong> ${video.level}</p>
        <p><strong>Duration:</strong> ${video.duration}</p>
        <p><strong>Instructor:</strong> ${video.instructor}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

searchInput.addEventListener("input", filterData);
filterSelect.addEventListener("change", filterData);

function filterData() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = filterSelect.value;

  const filtered = videos.filter((video) => {
    const matchText =
      video.title.toLowerCase().includes(searchText) ||
      video.description.toLowerCase().includes(searchText);

    const matchCategory =
      selectedCategory === "all" || video.category === selectedCategory;

    return matchText && matchCategory;
  });

  displayVideos(filtered);
}