// Sample gallery data
const images = [
  { src: "images/gallery/wildlife.jpg", caption: "Uganda Wildlife Safari" },
  { src: "images/gallery/culture.jpg", caption: "Traditional Dance Performance" },
  { src: "images/gallery/nature.jpg", caption: "Scenic Landscape" },
  { src: "images/gallery/adventure.jpg", caption: "Adventure Rafting" },
  { src: "images/gallery/family.jpg", caption: "Family Enjoying Local Life" },
  { src: "images/gallery/falls.jpg", caption: "Murchsion Fall" },
   { src: "images/gallery/savannah.jpg", caption: "Savannah vibes at Kidepo" },
  { src: "images/gallery/sunset.jpg", caption: "Sunset at Lake Bunyonyi" }
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const caption = document.querySelector(".caption");
const closeBtn = document.querySelector(".close");

// Render gallery
images.forEach(img => {
  const imageElement = document.createElement("img");
  imageElement.src = img.src;
  imageElement.alt = img.caption;
  imageElement.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    caption.textContent = img.caption;
  });
  gallery.appendChild(imageElement);
});

// Close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});
