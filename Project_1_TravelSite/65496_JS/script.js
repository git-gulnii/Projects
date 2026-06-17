const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

const tourContainer = document.getElementById("tour-container");
const selectedTourInput = document.getElementById("selected-tour");
const reservationList = document.getElementById("reservation-list");

function getNumericPrice(priceText) {
  return Number(priceText.replace(/[^0-9]/g, ""));
}

function formatPrice(amount) {
  return `$${amount}`;
}

function renderReservations() {
  if (!reservationList) return;

  const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  reservationList.innerHTML = "";

  if (reservations.length === 0) {
    reservationList.innerHTML = "<p class='empty-text'>No reservations yet.</p>";
    return;
  }

  reservations.forEach((reservation, index) => {
    const reservationCard = document.createElement("div");
    reservationCard.classList.add("reservation-card");

    reservationCard.innerHTML = `
      <h3>${reservation.tour}</h3>
      <p><strong>Name:</strong> ${reservation.name}</p>
      <p><strong>Email:</strong> ${reservation.email}</p>
      <p><strong>Phone:</strong> ${reservation.phone}</p>
      <p><strong>Guests:</strong> ${reservation.guests}</p>
      <p><strong>Date:</strong> ${reservation.date}</p>
      <p><strong>Price Per Person:</strong> ${reservation.pricePerPerson}</p>
      <p class="total-price"><strong>Total Price:</strong> ${reservation.totalPrice}</p>
      <button class="delete-btn" data-index="${index}">Cancel Reservation</button>
    `;

    reservationList.appendChild(reservationCard);
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
      reservations.splice(index, 1);
      localStorage.setItem("reservations", JSON.stringify(reservations));
      renderReservations();
    });
  });
}

if (tourContainer) {
  fetch("65496_DATA/tours.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((tour) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${tour.image}" alt="${tour.title}">
          <div class="card-content">
            <h3>${tour.title}</h3>
            <p>${tour.description}</p>
            <p><strong>Duration:</strong> ${tour.duration}</p>
            <p class="tour-price">${tour.price}</p>

            <button class="details-btn">View Details</button>

            <div class="tour-details">
              <p><strong>Location:</strong> ${tour.location}</p>
              <p><strong>Hotel:</strong> ${tour.hotel}</p>
              <p><strong>Transport:</strong> ${tour.transport}</p>
              <p><strong>Guide:</strong> ${tour.guide}</p>
              <p><strong>Meals:</strong> ${tour.meals}</p>
              <button 
                class="btn small-btn book-btn"
                data-title="${tour.title}"
                data-price="${tour.price}">
                Book Now
              </button>
            </div>
          </div>
        `;

        const detailsBtn = card.querySelector(".details-btn");
        const detailsBox = card.querySelector(".tour-details");
        const bookBtn = card.querySelector(".book-btn");

        detailsBtn.addEventListener("click", () => {
          detailsBox.classList.toggle("show");
          detailsBtn.textContent = detailsBox.classList.contains("show")
            ? "Hide Details"
            : "View Details";
        });

        bookBtn.addEventListener("click", () => {
          if (selectedTourInput) {
            selectedTourInput.value = tour.title;
            selectedTourInput.setAttribute("data-price", tour.price);

            window.scrollTo({
              top: document.querySelector(".booking-section").offsetTop - 70,
              behavior: "smooth"
            });
          }
        });

        tourContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error loading tours:", error);
      tourContainer.innerHTML = "<p>Tour data could not be loaded.</p>";
    });
}

const bookingForm = document.getElementById("booking-form");
const bookingMessage = document.getElementById("booking-message");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedTour = document.getElementById("selected-tour").value.trim();
    const selectedTourPrice = document.getElementById("selected-tour").getAttribute("data-price") || "";
    const name = document.getElementById("customer-name").value.trim();
    const email = document.getElementById("customer-email").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const guests = document.getElementById("guest-count").value.trim();
    const travelDate = document.getElementById("travel-date").value.trim();
    const cardName = document.getElementById("card-name").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiryDate = document.getElementById("expiry-date").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (
      selectedTour === "" ||
      name === "" ||
      email === "" ||
      phone === "" ||
      guests === "" ||
      travelDate === "" ||
      cardName === "" ||
      cardNumber === "" ||
      expiryDate === "" ||
      cvv === ""
    ) {
      bookingMessage.textContent = "Please fill in all booking fields.";
      bookingMessage.style.color = "red";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      bookingMessage.textContent = "Please enter a valid email address.";
      bookingMessage.style.color = "red";
      return;
    }

    if (Number(guests) < 1) {
      bookingMessage.textContent = "Guest count must be at least 1.";
      bookingMessage.style.color = "red";
      return;
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      bookingMessage.textContent = "Card number must be exactly 16 digits.";
      bookingMessage.style.color = "red";
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      bookingMessage.textContent = "CVV must be exactly 3 digits.";
      bookingMessage.style.color = "red";
      return;
    }

    const pricePerPersonNumber = getNumericPrice(selectedTourPrice);
    const totalPriceNumber = pricePerPersonNumber * Number(guests);

    const reservation = {
      tour: selectedTour,
      name: name,
      email: email,
      phone: phone,
      guests: guests,
      date: travelDate,
      pricePerPerson: formatPrice(pricePerPersonNumber),
      totalPrice: formatPrice(totalPriceNumber)
    };

    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    bookingMessage.textContent = `Your booking has been confirmed. Total price: ${formatPrice(totalPriceNumber)}.`;
    bookingMessage.style.color = "green";

    bookingForm.reset();
    document.getElementById("selected-tour").value = "";
    document.getElementById("selected-tour").removeAttribute("data-price");

    renderReservations();
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

renderReservations();