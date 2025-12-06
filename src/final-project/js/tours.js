// Sample tour data (replace with API or JSON later)
const tours = [
  {
    title: "Wildlife Safari Adventure",
    description: "Explore Uganda’s national parks and see lions, elephants, and gorillas.",
    duration: "5 Days",
    price: "$1200",
    image: "images/tours/safari.jpg"
  },
  {
    title: "Cultural Heritage Tour",
    description: "Experience Ugandan traditions, dances, and local cuisine.",
    duration: "3 Days",
    price: "$800",
    image: "images/tours/culture.jpg"
  },
  {
    title: "Family Adventure Trip",
    description: "Fun-filled activities for families including experiencing the local life style withe people of Uganda.",
    duration: "4 Days",
    price: "$950",
    image: "images/tours/family.jpg"
  }
];

// Render tours
const tourList = document.getElementById("tour-list");

function renderTours() {
  tours.forEach(tour => {
    const card = document.createElement("div");
    card.classList.add("tour-card");

    card.innerHTML = `
      <img src="${tour.image}" alt="${tour.title}">
      <div class="tour-card-content">
        <h2>${tour.title}</h2>
        <p>${tour.description}</p>
        <p><strong>Duration:</strong> ${tour.duration}</p>
        <p class="tour-price">${tour.price}</p>
      </div>
    `;

    tourList.appendChild(card);
  });
}

renderTours();


