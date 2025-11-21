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
// STUDIO + CREATIVE SLIDERS (ROBUST AUTO + GUARDS)
// ===============================

// Shared timing settings (adjust here if you want)
const AUTO_START_DELAY = 10000; // 10s after section visible
const SLIDE_INTERVAL = 10000;   // 10s per slide
const LAST_SLIDE_PAUSE = 10000; // 60s pause on last slide

/* ---------- STUDIO SLIDER ---------- */
const studioSlides = document.querySelectorAll("#studio-projects .project-slide");
const studioPrev = document.querySelector("#studio-projects .slider-arrow.left");
const studioNext = document.querySelector("#studio-projects .slider-arrow.right");
const studioDotsContainer = document.querySelector("#studio-projects .slider-dots");
const studioSliderWrapper = document.querySelector("#studio-projects .projects-slider");

let studioCurrent = 0;
let _studioStartTimeout = null;   // id for pending start timeout
let _studioInterval = null;       // id for running interval
let _studioLastPauseTimeout = null; // id for last-slide pause
let _studioAutoActive = false;    // is auto currently active (interval running or scheduled)
let _studioSectionVisible = false;

// Create dots
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

// Update slide visuals and animate cards
function studioUpdateSlider() {
  studioSlides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (studioDots[i]) studioDots[i].classList.remove("active");
  });

  const slide = studioSlides[studioCurrent];
  slide.classList.add("active");
  if (studioDots[studioCurrent]) studioDots[studioCurrent].classList.add("active");

  // Animate cards inside active slide
  const cards = slide.querySelectorAll(".project-card");
  cards.forEach((card, index) => {
    card.classList.remove("show");
    setTimeout(() => card.classList.add("show"), index * 100);
  });

  // toggles for arrows
  studioPrev.classList.toggle("disabled", studioCurrent === 0);
  studioNext.classList.toggle("disabled", studioCurrent === studioSlides.length - 1);
}

// Navigation helpers
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

// Clear any scheduled/active studio timers
function studioStopAutoSlide() {
  if (_studioStartTimeout) {
    clearTimeout(_studioStartTimeout);
    _studioStartTimeout = null;
  }
  if (_studioInterval) {
    clearInterval(_studioInterval);
    _studioInterval = null;
  }
  if (_studioLastPauseTimeout) {
    clearTimeout(_studioLastPauseTimeout);
    _studioLastPauseTimeout = null;
  }
  _studioAutoActive = false;
}

// Start auto-play: schedules a single start timeout and then uses one interval. Safe to call multiple times.
function studioStartAutoSlide() {
  // If already active (either scheduled or running), do nothing
  if (_studioAutoActive) return;

  _studioAutoActive = true;

  // schedule the start delay
  _studioStartTimeout = setTimeout(() => {
    _studioStartTimeout = null;
    // start interval
    _studioInterval = setInterval(() => {
      if (studioCurrent < studioSlides.length - 1) {
        studioNextSlide();
      } else {
        // reached last slide: stop interval and set a single pause timeout
        if (_studioInterval) {
          clearInterval(_studioInterval);
          _studioInterval = null;
        }
        _studioLastPauseTimeout = setTimeout(() => {
          _studioLastPauseTimeout = null;
          studioCurrent = 0;
          studioUpdateSlider();
          // restart the interval loop
          if (_studioAutoActive) {
            _studioInterval = setInterval(() => {
              if (studioCurrent < studioSlides.length - 1) {
                studioNextSlide();
              } else {
                if (_studioInterval) {
                  clearInterval(_studioInterval);
                  _studioInterval = null;
                }
                _studioLastPauseTimeout = setTimeout(() => {
                  _studioLastPauseTimeout = null;
                  studioCurrent = 0;
                  studioUpdateSlider();
                }, LAST_SLIDE_PAUSE);
              }
            }, SLIDE_INTERVAL);
          }
        }, LAST_SLIDE_PAUSE);
      }
    }, SLIDE_INTERVAL);
  }, AUTO_START_DELAY);
}

// Reset auto: stop everything then start fresh only if section still visible
function studioResetAutoSlide() {
  studioStopAutoSlide();
  if (_studioSectionVisible) studioStartAutoSlide();
}

// Hover pause functionality
studioSliderWrapper.addEventListener("mouseenter", () => {
  // pause but keep the _studioAutoActive flag so reset will resume if visible
  if (_studioInterval) {
    clearInterval(_studioInterval);
    _studioInterval = null;
  }
  if (_studioStartTimeout) {
    // if we were waiting to start, keep it scheduled (optional). We clear it to avoid surprises.
    clearTimeout(_studioStartTimeout);
    _studioStartTimeout = null;
  }
});
studioSliderWrapper.addEventListener("mouseleave", () => {
  if (_studioSectionVisible) studioResetAutoSlide();
});

// Buttons
studioNext.addEventListener("click", () => {
  studioNextSlide();
  studioResetAutoSlide();
});
studioPrev.addEventListener("click", () => {
  studioPrevSlide();
  studioResetAutoSlide();
});

// Visibility watcher for studio: starts once when section enters view, stops when leaves
function studioStartAutoWhenVisible() {
  const section = document.querySelector("#studio-projects");
  const rect = section.getBoundingClientRect();
  const visible = rect.top < window.innerHeight && rect.bottom > 0;
  if (visible && !_studioSectionVisible) {
    _studioSectionVisible = true;
    studioStartAutoSlide();
  } else if (!visible && _studioSectionVisible) {
    _studioSectionVisible = false;
    studioStopAutoSlide();
  }
}
window.addEventListener("scroll", studioStartAutoWhenVisible);
window.addEventListener("load", () => {
  studioUpdateSlider();
  studioStartAutoWhenVisible();
});


/* ---------- CREATIVE SLIDER ---------- */
const creativeSlides = document.querySelectorAll("#creative-projects .project-slide");
const creativePrev = document.querySelector("#creative-projects .slider-arrow.left");
const creativeNext = document.querySelector("#creative-projects .slider-arrow.right");
const creativeDotsContainer = document.querySelector("#creative-projects .slider-dots");
const creativeSliderWrapper = document.querySelector("#creative-projects .projects-slider");

let creativeCurrent = 0;
let _creativeStartTimeout = null;
let _creativeInterval = null;
let _creativeLastPauseTimeout = null;
let _creativeAutoActive = false;
let _creativeSectionVisible = false;

// Create dots
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

// Update
function creativeUpdateSlider() {
  creativeSlides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (creativeDots[i]) creativeDots[i].classList.remove("active");
  });

  const slide = creativeSlides[creativeCurrent];
  slide.classList.add("active");
  if (creativeDots[creativeCurrent]) creativeDots[creativeCurrent].classList.add("active");

  const cards = slide.querySelectorAll(".project-card");
  cards.forEach((card, index) => {
    card.classList.remove("show");
    setTimeout(() => card.classList.add("show"), index * 100);
  });

  creativePrev.classList.toggle("disabled", creativeCurrent === 0);
  creativeNext.classList.toggle("disabled", creativeCurrent === creativeSlides.length - 1);
}

// Navigation
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

// Clear timers
function creativeStopAutoSlide() {
  if (_creativeStartTimeout) {
    clearTimeout(_creativeStartTimeout);
    _creativeStartTimeout = null;
  }
  if (_creativeInterval) {
    clearInterval(_creativeInterval);
    _creativeInterval = null;
  }
  if (_creativeLastPauseTimeout) {
    clearTimeout(_creativeLastPauseTimeout);
    _creativeLastPauseTimeout = null;
  }
  _creativeAutoActive = false;
}

// Start auto
function creativeStartAutoSlide() {
  if (_creativeAutoActive) return;
  _creativeAutoActive = true;

  _creativeStartTimeout = setTimeout(() => {
    _creativeStartTimeout = null;
    _creativeInterval = setInterval(() => {
      if (creativeCurrent < creativeSlides.length - 1) {
        creativeNextSlide();
      } else {
        if (_creativeInterval) {
          clearInterval(_creativeInterval);
          _creativeInterval = null;
        }
        _creativeLastPauseTimeout = setTimeout(() => {
          _creativeLastPauseTimeout = null;
          creativeCurrent = 0;
          creativeUpdateSlider();
          if (_creativeAutoActive) {
            _creativeInterval = setInterval(() => {
              if (creativeCurrent < creativeSlides.length - 1) creativeNextSlide();
              else {
                if (_creativeInterval) {
                  clearInterval(_creativeInterval);
                  _creativeInterval = null;
                }
                _creativeLastPauseTimeout = setTimeout(() => {
                  _creativeLastPauseTimeout = null;
                  creativeCurrent = 0;
                  creativeUpdateSlider();
                }, LAST_SLIDE_PAUSE);
              }
            }, SLIDE_INTERVAL);
          }
        }, LAST_SLIDE_PAUSE);
      }
    }, SLIDE_INTERVAL);
  }, AUTO_START_DELAY);
}

// Reset auto
function creativeResetAutoSlide() {
  creativeStopAutoSlide();
  if (_creativeSectionVisible) creativeStartAutoSlide();
}

// Hover pause
creativeSliderWrapper.addEventListener("mouseenter", () => {
  if (_creativeInterval) {
    clearInterval(_creativeInterval);
    _creativeInterval = null;
  }
  if (_creativeStartTimeout) {
    clearTimeout(_creativeStartTimeout);
    _creativeStartTimeout = null;
  }
});
creativeSliderWrapper.addEventListener("mouseleave", () => {
  if (_creativeSectionVisible) creativeResetAutoSlide();
});

// Buttons
creativeNext.addEventListener("click", () => {
  creativeNextSlide();
  creativeResetAutoSlide();
});
creativePrev.addEventListener("click", () => {
  creativePrevSlide();
  creativeResetAutoSlide();
});

// Visibility watcher
function creativeStartAutoWhenVisible() {
  const section = document.querySelector("#creative-projects");
  const rect = section.getBoundingClientRect();
  const visible = rect.top < window.innerHeight && rect.bottom > 0;
  if (visible && !_creativeSectionVisible) {
    _creativeSectionVisible = true;
    creativeStartAutoSlide();
  } else if (!visible && _creativeSectionVisible) {
    _creativeSectionVisible = false;
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






