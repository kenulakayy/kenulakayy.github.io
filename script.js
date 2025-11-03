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
// Fade-in Slider Dots when Section Comes into View
// ===============================
const studioSection = document.querySelector("#studio-projects");
const sliderDots = document.querySelector("#studio-projects .slider-dots");

function fadeInDots() {
  if (!studioSection || !sliderDots) return;

  const sectionTop = studioSection.getBoundingClientRect().top;
  const sectionBottom = studioSection.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;

  // When section enters viewport
  if (sectionTop < windowHeight * 0.9 && sectionBottom > 0) {
    sliderDots.classList.add("show");
  } else {
    sliderDots.classList.remove("show");
  }
}

window.addEventListener("scroll", fadeInDots);
window.addEventListener("load", fadeInDots);

// ===============================
// Studio Projects Slider (Fade + Auto + Hover Pause)
// ===============================
const slides = document.querySelectorAll("#studio-projects .project-slide");
const prevBtn = document.querySelector("#studio-projects .slider-arrow.left");
const nextBtn = document.querySelector("#studio-projects .slider-arrow.right");
const dotsContainer = document.querySelector("#studio-projects .slider-dots");
const sliderWrapper = document.querySelector("#studio-projects .projects-slider");

let currentSlide = 0;
let autoSlideInterval = null;
let hoverTimeout = null;
let autoStarted = false;

// --- Create dots dynamically ---
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

// --- Core slider update ---
function updateSlider() {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
  });

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");

  // Animate current cards with stagger
  const cards = slides[currentSlide].querySelectorAll(".project-card");
  cards.forEach((card, index) => {
    card.classList.remove("show");
    setTimeout(() => card.classList.add("show"), index * 100);
  });

  // Disable arrows properly
  prevBtn.classList.toggle("disabled", currentSlide === 0);
  nextBtn.classList.toggle("disabled", currentSlide === slides.length - 1);
}

// --- Navigation helpers ---
function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
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

// --- Auto Slide Logic ---
function startAutoSlide() {
  stopAutoSlide(); // clear old interval
  autoSlideInterval = setInterval(() => {
    if (currentSlide < slides.length - 1) {
      nextSlide();
    } else {
      stopAutoSlide(); // stop at last slide
    }
  }, 10000); // 10s per slide
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// --- Hover pause + delayed resume ---
sliderWrapper.addEventListener("mouseenter", () => {
  stopAutoSlide();
  clearTimeout(hoverTimeout);
});

sliderWrapper.addEventListener("mouseleave", () => {
  clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(startAutoSlide, 5000);
});

// --- Button controls ---
nextBtn.addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    nextSlide();
    resetAutoSlide();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentSlide > 0) {
    prevSlide();
    resetAutoSlide();
  }
});

// --- Start only when section visible ---
function startAutoWhenVisible() {
  const studioSection = document.querySelector("#studio-projects");
  const sectionTop = studioSection.getBoundingClientRect().top;
  const sectionBottom = studioSection.getBoundingClientRect().bottom;

  // Start auto when visible in viewport
  if (sectionTop < window.innerHeight && sectionBottom > 0 && !autoStarted) {
    startAutoSlide();
    autoStarted = true;
  }

  // Optional: stop if completely out of view
  if ((sectionBottom <= 0 || sectionTop >= window.innerHeight) && autoStarted) {
    stopAutoSlide();
    autoStarted = false;
  }
}

window.addEventListener("scroll", startAutoWhenVisible);
window.addEventListener("load", () => {
  updateSlider();
  startAutoWhenVisible();
});

// ===============================
// Fade-in animation for Creative Projects
// ===============================
const creativeSection = document.querySelector("#creative-projects");
const creativeHeading = creativeSection.querySelector("h2");
const creativeDots = creativeSection.querySelector(".slider-dots");

function checkCreativeVisibility() {
  const rect = creativeSection.getBoundingClientRect();
  const visible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

  if (visible) {
    creativeHeading.classList.add("show");
    setTimeout(() => {
      creativeDots.classList.add("show");
    }, 800); // dots fade in after heading
  }
}

window.addEventListener("scroll", checkCreativeVisibility);
window.addEventListener("load", checkCreativeVisibility);

// ===============================
// Creative Projects Slider (identical independent version)
// ===============================
const creativeSlides = document.querySelectorAll("#creative-projects .project-slide");
const creativePrev = document.querySelector("#creative-projects .slider-arrow.left");
const creativeNext = document.querySelector("#creative-projects .slider-arrow.right");
const creativeDotsContainer = document.querySelector("#creative-projects .slider-dots");
const creativeSliderWrapper = document.querySelector("#creative-projects .projects-slider");

let creativeCurrent = 0;
let creativeAutoSlideInterval = null;
let creativeHoverTimeout = null;
let creativeAutoStarted = false;

// --- Create dots dynamically ---
creativeSlides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  creativeDotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    creativeGoToSlide(i);
    creativeResetAutoSlide();
  });
});

const creativeDots = document.querySelectorAll("#creative-projects .slider-dots button");

// --- Update slide ---
function creativeUpdateSlider() {
  creativeSlides.forEach((slide, i) => {
    slide.classList.remove("active");
    creativeDots[i].classList.remove("active");
  });

  creativeSlides[creativeCurrent].classList.add("active");
  creativeDots[creativeCurrent].classList.add("active");

  const cards = creativeSlides[creativeCurrent].querySelectorAll(".project-card");
  cards.forEach((card, index) => {
    card.classList.remove("show");
    setTimeout(() => card.classList.add("show"), index * 100);
  });

  creativePrev.classList.toggle("disabled", creativeCurrent === 0);
  creativeNext.classList.toggle("disabled", creativeCurrent === creativeSlides.length - 1);
}

// --- Navigation ---
function creativeGoToSlide(i) {
  if (i < 0 || i >= creativeSlides.length) return;
  creativeCurrent = i;
  creativeUpdateSlider();
}
function creativeNextSlide() {
  if (creativeCurrent < creativeSlides.length - 1) {
    creativeCurrent++;
    creativeUpdateSlider();
  }
}
function creativePrevSlide() {
  if (creativeCurrent > 0) {
    creativeCurrent--;
    creativeUpdateSlider();
  }
}

// --- Auto slide ---
function creativeStartAutoSlide() {
  creativeStopAutoSlide();
  creativeAutoSlideInterval = setInterval(() => {
    if (creativeCurrent < creativeSlides.length - 1) {
      creativeNextSlide();
    } else {
      creativeStopAutoSlide(); // stop at last slide
    }
  }, 10000);
}
function creativeStopAutoSlide() {
  clearInterval(creativeAutoSlideInterval);
}
function creativeResetAutoSlide() {
  creativeStopAutoSlide();
  creativeStartAutoSlide();
}

// --- Hover pause ---
creativeSliderWrapper.addEventListener("mouseenter", () => {
  creativeStopAutoSlide();
  clearTimeout(creativeHoverTimeout);
});
creativeSliderWrapper.addEventListener("mouseleave", () => {
  clearTimeout(creativeHoverTimeout);
  creativeHoverTimeout = setTimeout(creativeStartAutoSlide, 5000);
});

// --- Buttons ---
creativeNext.addEventListener("click", () => {
  creativeNextSlide();
  creativeResetAutoSlide();
});
creativePrev.addEventListener("click", () => {
  creativePrevSlide();
  creativeResetAutoSlide();
});

// --- Start auto when visible ---
function creativeStartAutoWhenVisible() {
  const creativeSection = document.querySelector("#creative-projects");
  const top = creativeSection.getBoundingClientRect().top;
  const bottom = creativeSection.getBoundingClientRect().bottom;

  if (top < window.innerHeight && bottom > 0 && !creativeAutoStarted) {
    creativeStartAutoSlide();
    creativeAutoStarted = true;
  }

  if ((bottom <= 0 || top >= window.innerHeight) && creativeAutoStarted) {
    creativeStopAutoSlide();
    creativeAutoStarted = false;
  }
}

window.addEventListener("scroll", creativeStartAutoWhenVisible);
window.addEventListener("load", () => {
  creativeUpdateSlider();
  creativeStartAutoWhenVisible();
});

// ===============================
// Animate Creative Projects Heading (on scroll)
// ===============================
const creativeHeading = document.querySelector("#creative-projects h2");
let creativePlayed = false;

function animateCreativeHeading() {
  if (!creativeHeading) return;

  const sectionTop = document.querySelector("#creative-projects").offsetTop;
  const scrollY = window.scrollY;

  if (scrollY + window.innerHeight > sectionTop + 100 && !creativePlayed) {
    creativeHeading.classList.add("show");
    creativePlayed = true; // only once
  }
}

window.addEventListener("scroll", animateCreativeHeading);
window.addEventListener("load", animateCreativeHeading);

// ===============================
// Animate Creative Projects Grid (staggered)
// ===============================
const creativeCards = document.querySelectorAll("#creative-projects .project-card");
let creativeGridPlayed = false;

function animateCreativeGrid() {
  const sectionTop = document.querySelector("#creative-projects").offsetTop;
  const triggerBottom = window.innerHeight * 0.85;

  if (window.scrollY + triggerBottom > sectionTop && !creativeGridPlayed) {
    creativeCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 200);
    });
    creativeGridPlayed = true;
  }
}

window.addEventListener("scroll", animateCreativeGrid);
window.addEventListener("load", animateCreativeGrid);

// ===============================
// Fade-in Slider Dots when Section Comes into View
// ===============================
const creativeSection = document.querySelector("#creative-projects");
const creativeDotsWrapper = document.querySelector("#creative-projects .slider-dots");

function fadeInCreativeDots() {
  if (!creativeSection || !creativeDotsWrapper) return;

  const sectionTop = creativeSection.getBoundingClientRect().top;
  const sectionBottom = creativeSection.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight * 0.9 && sectionBottom > 0) {
    creativeDotsWrapper.classList.add("show");
  } else {
    creativeDotsWrapper.classList.remove("show");
  }
}

window.addEventListener("scroll", fadeInCreativeDots);
window.addEventListener("load", fadeInCreativeDots);


