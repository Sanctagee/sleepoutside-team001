// Hero slideshow
const slides = document.querySelectorAll(".hero-slideshow img");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Initialize
showSlide(currentSlide);
setInterval(nextSlide, 4000); // change every 4 seconds
