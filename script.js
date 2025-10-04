// Mobile menu
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
burger.addEventListener("click", () => navLinks.classList.toggle("active"));

// About section animation + parallax
const aboutSection = document.querySelector("#about");
const aboutBg = document.querySelector(".about-bg");
const aboutHeading = document.querySelector(".animate-heading");
const aboutLines = document.querySelectorAll(".about-text p");
let aboutPlayed = false;
function animateAbout() {
  let scrollY = window.scrollY;
  let sectionTop = aboutSection.offsetTop;
  let sectionHeight = aboutSection.offsetHeight;
  if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
    let offset = (scrollY - sectionTop) * 0.15;
    aboutBg.style.transform = `translateY(${offset}px) scale(1.2)`;
    if (!aboutPlayed) {
      aboutHeading.classList.add("show");
      aboutLines.forEach((line, i) => setTimeout(() => line.classList.add("show"), 500 + i * 250));
      aboutPlayed = true;
    }
  }
}
window.addEventListener("scroll", animateAbout);
window.addEventListener("load", animateAbout);

// Studio Projects slider
const slides = document.querySelectorAll("#studio-projects .project-slide");
const prevBtn = document.querySelector("#studio-projects .slider-arrow.left");
const nextBtn = document.querySelector("#studio-projects .slider-arrow.right");
const dotsContainer = document.querySelector("#studio-projects .slider-dots");
let currentSlide = 0, autoSlideInterval, hoverTimeout;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
  dot.addEventListener("click", () => { goToSlide(i); resetAutoSlide(); });
});
const dots = document.querySelectorAll("#studio-projects .slider-dots button");

function updateSlider() {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
  });
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
  // Animate cards
  const cards = slides[currentSlide].querySelectorAll(".project-card");
  cards.forEach((card, i) => {
    card.classList.remove("show");
    setTimeout(() => card.classList.add("show"), i * 150);
  });
}
function goToSlide(i) { currentSlide = i; updateSlider(); }
function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; updateSlider(); }
function prevSlide() { currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateSlider(); }

// Auto-slide
function startAutoSlide() { stopAutoSlide(); autoSlideInterval = setInterval(nextSlide, 10000); }
function stopAutoSlide() { clearInterval(autoSlideInterval); }
function resetAutoSlide() { stopAutoSlide(); startAutoSlide(); }

// Controls
nextBtn.addEventListener("click", () => { nextSlide(); resetAutoSlide(); });
prevBtn.addEventListener("click", () => { prevSlide(); resetAutoSlide(); });

// Hover pause
const sliderWrapper = document.querySelector("#studio-projects .projects-slider");
sliderWrapper.addEventListener("mouseenter", () => { stopAutoSlide(); clearTimeout(hoverTimeout); });
sliderWrapper.addEventListener("mouseleave", () => { hoverTimeout = setTimeout(startAutoSlide, 5000); });

// Init
updateSlider();
startAutoSlide();
