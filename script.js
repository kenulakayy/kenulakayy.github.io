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
// Smooth Scroll for Links (SAFE FIX)
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Ignore links that are exactly "#"
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // offset for navbar height
        behavior: "smooth"
      });
    }
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
// STUDIO PROJECTS SLIDER (FULL UPDATED)
// ===============================
const studioSlides = document.querySelectorAll("#studio-projects .project-slide");
const studioPrev = document.querySelector("#studio-projects .slider-arrow.left");
const studioNext = document.querySelector("#studio-projects .slider-arrow.right");
const studioDotsContainer = document.querySelector("#studio-projects .slider-dots");
const studioSliderWrapper = document.querySelector("#studio-projects .projects-slider");

let studioCurrent = 0;
let studioAutoSlideInterval = null;

// --- Create dots dynamically ---
studioSlides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  studioDotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    studioGoToSlide(i);
    studioResetAutoSlide();
  });
});

const studioDots = document.querySelectorAll("#studio-projects .slider-dots button");

// --- Update slide ---
function studioUpdateSlider() {
  studioSlides.forEach((slide, i) => {
    slide.classList.remove("active");
    studioDots[i].classList.remove("active");
  });

  studioSlides[studioCurrent].classList.add("active");
  studioDots[studioCurrent].classList.add("active");

  const cards = studioSlides[studioCurrent].querySelectorAll(".project-card");
  cards.forEach((card, index) => {
    card.classList.remove("show");
    setTimeout(() => card.classList.add("show"), index * 100);
  });

  studioPrev.classList.toggle("disabled", studioCurrent === 0);
  studioNext.classList.toggle("disabled", studioCurrent === studioSlides.length - 1);
}

// --- Navigation ---
function studioGoToSlide(i) {
  if (i < 0 || i >= studioSlides.length) return;
  studioCurrent = i;
  studioUpdateSlider();
}
function studioNextSlide() {
  if (studioCurrent < studioSlides.length - 1) {
    studioCurrent++;
    studioUpdateSlider();
  }
}
function studioPrevSlide() {
  if (studioCurrent > 0) {
    studioCurrent--;
    studioUpdateSlider();
  }
}

// --- Auto slide logic ---
function studioStartAutoSlide() {
  studioStopAutoSlide();

  // Wait 3 seconds after visible
  setTimeout(() => {
    studioAutoSlideInterval = setInterval(() => {
      if (studioCurrent < studioSlides.length - 1) {
        studioNextSlide();
      } else {
        // Last slide → instantly jump to slide 1 after 10s
        studioCurrent = 0;
        studioUpdateSlider();
      }
    }, 10000); // 10 seconds per slide
  }, 3000); // initial 3s delay
}

function studioStopAutoSlide() {
  clearInterval(studioAutoSlideInterval);
}

function studioResetAutoSlide() {
  studioStopAutoSlide();
  studioStartAutoSlide(); // always restart with 3s delay
}

// --- Hover pause ---
studioSliderWrapper.addEventListener("mouseenter", studioStopAutoSlide);
studioSliderWrapper.addEventListener("mouseleave", studioResetAutoSlide);

// --- Buttons ---
studioNext.addEventListener("click", () => {
  studioNextSlide();
  studioResetAutoSlide();
});
studioPrev.addEventListener("click", () => {
  studioPrevSlide();
  studioResetAutoSlide();
});

// --- Start auto when visible ---
function studioStartAutoWhenVisible() {
  const section = document.querySelector("#studio-projects");
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    studioStartAutoSlide();
  } else {
    studioStopAutoSlide();
  }
}
window.addEventListener("scroll", studioStartAutoWhenVisible);
window.addEventListener("load", () => {
  studioUpdateSlider();
  studioStartAutoWhenVisible();
});


// ===============================
// CREATIVE PROJECTS SLIDER (FULL UPDATED)
// ===============================
const creativeSlides = document.querySelectorAll("#creative-projects .project-slide");
const creativePrev = document.querySelector("#creative-projects .slider-arrow.left");
const creativeNext = document.querySelector("#creative-projects .slider-arrow.right");
const creativeDotsContainer = document.querySelector("#creative-projects .slider-dots");
const creativeSliderWrapper = document.querySelector("#creative-projects .projects-slider");

let creativeCurrent = 0;
let creativeAutoSlideInterval = null;

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

// --- Auto slide logic ---
function creativeStartAutoSlide() {
  creativeStopAutoSlide();

  // Wait 3 seconds after visible
  setTimeout(() => {
    creativeAutoSlideInterval = setInterval(() => {
      if (creativeCurrent < creativeSlides.length - 1) {
        creativeNextSlide();
      } else {
        // Last slide → instantly jump to slide 1 after 10s
        creativeCurrent = 0;
        creativeUpdateSlider();
      }
    }, 10000); // 10 seconds per slide
  }, 3000); // initial 3s delay
}

function creativeStopAutoSlide() {
  clearInterval(creativeAutoSlideInterval);
}

function creativeResetAutoSlide() {
  creativeStopAutoSlide();
  creativeStartAutoSlide(); // always restart with 3s delay
}

// --- Hover pause ---
creativeSliderWrapper.addEventListener("mouseenter", creativeStopAutoSlide);
creativeSliderWrapper.addEventListener("mouseleave", creativeResetAutoSlide);

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
  const section = document.querySelector("#creative-projects");
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    creativeStartAutoSlide();
  } else {
    creativeStopAutoSlide();
  }
}
window.addEventListener("scroll", creativeStartAutoWhenVisible);
window.addEventListener("load", () => {
  creativeUpdateSlider();
  creativeStartAutoWhenVisible();
});


// ===============================
// SECTION FADE-IN ANIMATIONS (FIXED)
// ===============================
const studioSection = document.querySelector("#studio-projects");
const studioHeading = studioSection.querySelector("h2");
const studioDotsEl = studioSection.querySelector(".slider-dots");

const creativeSection = document.querySelector("#creative-projects");
const creativeHeading = creativeSection.querySelector("h2");
const creativeDotsEl = creativeSection.querySelector(".slider-dots");

function fadeInSections() {
  [studioSection, creativeSection].forEach((section) => {
    const rect = section.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

    if (visible) {
      const heading = section.querySelector("h2");
      const dots = section.querySelector(".slider-dots");

      heading.classList.add("show");
      setTimeout(() => dots.classList.add("show"), 800);

      // ❌ Removed: card fade-in on scroll
    }
  });
}

window.addEventListener("scroll", fadeInSections);
window.addEventListener("load", fadeInSections);


