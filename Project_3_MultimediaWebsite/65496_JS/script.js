const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

const videoContainer = document.getElementById("video-container");

if (videoContainer) {
  fetch("65496_DATA/videos.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((video) => {
        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");

        videoCard.innerHTML = `
          <iframe src="${video.embed}" title="${video.title}" allowfullscreen></iframe>
          <div class="video-card-content">
            <h3>${video.title}</h3>
            <p><strong>Topic:</strong> ${video.topic}</p>
            <p>${video.description}</p>
          </div>
        `;

        videoContainer.appendChild(videoCard);
      });
    })
    .catch((error) => {
      console.error("Error loading videos:", error);
      videoContainer.innerHTML = "<p>Videos could not be loaded.</p>";
    });
}

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      formMessage.textContent = "Please fill in all fields.";
      formMessage.style.color = "red";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.style.color = "red";
      return;
    }

    formMessage.textContent = "Your message has been sent successfully.";
    formMessage.style.color = "green";

    contactForm.reset();
  });
}