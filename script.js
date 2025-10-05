// ===============================
// Mobile menu toggle
// ===============================
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ===============================
// Easy Edit Projects Section
// ===============================
// Just add new project objects here when you want to update your site
const studioProjects = [
  {
    name: "Project 1",
    img: "https://via.placeholder.com/400x300",
    link: "#"
  },
  {
    name: "Project 2",
    img: "https://via.placeholder.com/400x300",
    link: "#"
  }
];

const creativeProjects = [
  {
    name: "Creative 1",
    img: "https://via.placeholder.com/400x300",
    link: "#"
  },
  {
    name: "Creative 2",
    img: "https://via.placeholder.com/400x300",
    link: "#"
  }
];

// Function to generate grid HTML
function renderProjects(containerId, projects) {
  const container = document.getElementById(containerId);
  container.innerHTML = projects
    .map(
      project => `
    <div class="grid-item">
      <a href="${project.link}" target="_blank">
        <img src="${project.img}" alt="${project.name}">
        <div class="overlay"><span>${project.name}</span></div>
      </a>
    </div>
  `
    )
    .join("");
}


// ===============================
// Scroll Fade-in Sections
// ===============================
const fadeSections = document.querySelectorAll("section");
const gridContainers = document.querySelectorAll(".grid");

function checkFadeIn() {
  const triggerBottom = window.innerHeight * 0.85;

  // Fade-in for full sections
  fadeSections.forEach(section => {
    const boxTop = section.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      section.classList.add("show");
    }
  });

  // Staggered fade-in for grids
  gridContainers.forEach(grid => {
    const boxTop = grid.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      const items = grid.querySelectorAll(".grid-item");
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("show");
        }, index * 150); // 150ms delay between each tile
      });
    }
  });
}

window.addEventListener("scroll", checkFadeIn);
window.addEventListener("load", () => {
  fadeSections.forEach(el => el.classList.add("fade-in"));
  checkFadeIn();
});

// ===============================
// Scroll Arrow
// ===============================
const arrow = document.querySelector(".scroll-down");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    arrow.classList.add("hide");
  } else {
    arrow.classList.remove("hide");
  }
});

arrow.addEventListener("click", function () {
  this.classList.add("hide");
});

// ===============================
// Smooth Scroll for Links
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // offset for navbar height
        behavior: "smooth"
      });
    }
  });
});

// Smooth scroll to top when logo is clicked
document.querySelector(".logo-link").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===============================
// Highlight active navbar link
// ===============================
const sections = document.querySelectorAll("section");
const navLinksList = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // offset for navbar height
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinksList.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ===============================
// About Section Animation + Subtle Parallax (plays once)
// ===============================
const aboutSection = document.querySelector("#about");
const aboutBg = document.querySelector(".about-bg");
const aboutHeading = document.querySelector(".animate-heading");
const aboutLines = document.querySelectorAll(".about-text p");
let aboutPlayed = false;

function animateAbout() {
  if (!aboutSection || !aboutBg) return;

  let scrollY = window.scrollY;
  let sectionTop = aboutSection.offsetTop;
  let sectionHeight = aboutSection.offsetHeight;

  if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
    // Subtle parallax effect
    let offset = (scrollY - sectionTop) * 0.15; // much smaller movement
    aboutBg.style.transform = `translateY(${offset}px) scale(1.2)`; // locked zoom, only moves a bit

    // Trigger animations once
    if (!aboutPlayed) {
      aboutHeading.classList.add("show");
      aboutLines.forEach((line, index) => {
        setTimeout(() => line.classList.add("show"), 500 + index * 250);
      });
      aboutPlayed = true; // only once per reload
    }
  }
}

window.addEventListener("scroll", animateAbout);
window.addEventListener("load", animateAbout);

// ===============================
// Animate Studio Projects Heading (on scroll)
// ===============================
const studioHeading = document.querySelector("#studio-projects h2");
let studioPlayed = false;

function animateStudio() {
  if (!studioHeading) return;

  let scrollY = window.scrollY;
  let sectionTop = document.querySelector("#studio-projects").offsetTop;
  let sectionHeight = document.querySelector("#studio-projects").offsetHeight;

  if (scrollY + window.innerHeight > sectionTop + 100 && !studioPlayed) {
    studioHeading.classList.add("show");
    studioPlayed = true; // only once
  }
}

window.addEventListener("scroll", animateStudio);
window.addEventListener("load", animateStudio);

// ===============================
// Animate Studio Projects Grid (staggered)
// ===============================
const studioCards = document.querySelectorAll("#studio-projects .project-card");
let studioGridPlayed = false;

function animateStudioGrid() {
  const sectionTop = document.querySelector("#studio-projects").offsetTop;
  const triggerBottom = window.innerHeight * 0.85;

  if (window.scrollY + triggerBottom > sectionTop && !studioGridPlayed) {
    studioCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 200); // stagger 200ms per card
    });
    studioGridPlayed = true; // only once
  }
}

window.addEventListener("scroll", animateStudioGrid);
window.addEventListener("load", animateStudioGrid);

// ===============================
// Studio Projects Slider (Fade + Auto + Hover Pause)
// ===============================
const slides = document.querySelectorAll("#studio-projects .project-slide");
const prevBtn = document.querySelector("#studio-projects .slider-arrow.left");
const nextBtn = document.querySelector("#studio-projects .slider-arrow.right");
const dotsContainer = document.querySelector("#studio-projects .slider-dots");
const sliderWrapper = document.querySelector("#studio-projects .projects-slider");

let currentSlide = 0;
let autoSlideInterval;
let hoverTimeout;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    goToSlide(i);
    resetAutoSlide();
  });
});

const dots = document.querySelectorAll("#studio-projects .slider-dots button");

function updateSlider() {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
  });

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");

  // Animate cards in this slide (staggered)
  const currentCards = slides[currentSlide].querySelectorAll(".project-card");
  currentCards.forEach((card, index) => {
    card.classList.remove("show");
    setTimeout(() => {
      card.classList.add("show");
    }, index * 150);
  });

  // 🔸 Disable arrows when needed
  if (prevBtn) prevBtn.classList.toggle("disabled", currentSlide === 0);
  if (nextBtn) nextBtn.classList.toggle("disabled", currentSlide === slides.length - 1);
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateSlider();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlider();
  }
}

// Auto-slide logic
function startAutoSlide() {
  stopAutoSlide(); // prevent duplicates
  autoSlideInterval = setInterval(nextSlide, 10000); // 10s per slide
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Pause on hover, resume after 5s
sliderWrapper.addEventListener("mouseenter", () => {
  stopAutoSlide();
  clearTimeout(hoverTimeout);
});

sliderWrapper.addEventListener("mouseleave", () => {
  clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(startAutoSlide, 5000);
});

// Button controls
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

// Start auto-slide on load
updateSlider(); // show first slide
startAutoSlide();



