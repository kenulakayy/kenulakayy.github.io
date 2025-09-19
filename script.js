// Mobile menu toggle
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// === EASY EDIT SECTION ===
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
// === END EASY EDIT SECTION ===

// Function to generate grid HTML
function renderProjects(containerId, projects) {
  const container = document.getElementById(containerId);
  container.innerHTML = projects.map(project => `
    <div class="grid-item">
      <a href="${project.link}" target="_blank">
        <img src="${project.img}" alt="${project.name}">
        <div class="overlay"><span>${project.name}</span></div>
      </a>
    </div>
  `).join('');
}

// Render grids
renderProjects("studio-grid", studioProjects);
renderProjects("creative-grid", creativeProjects);

// Mobile menu toggle
document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Fade-in for sections and staggered grid animations
const fadeSections = document.querySelectorAll('section');
const gridContainers = document.querySelectorAll('.grid');

function checkFadeIn() {
  const triggerBottom = window.innerHeight * 0.85;

  // Fade-in for full sections
  fadeSections.forEach(section => {
    const boxTop = section.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      section.classList.add('show');
    }
  });

  // Staggered fade-in for grids
  gridContainers.forEach(grid => {
    const boxTop = grid.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      const items = grid.querySelectorAll('.grid-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('show');
        }, index * 150); // 150ms delay between each tile
      });
    }
  });
}

window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', () => {
  fadeSections.forEach(el => el.classList.add('fade-in'));
  checkFadeIn();
});

window.addEventListener("scroll", function () {
  const arrow = document.querySelector(".scroll-down");
  if (window.scrollY > 50) {
    arrow.classList.add("hide");
  } else {
    arrow.classList.remove("hide");
  }
});

document.querySelector(".scroll-down").addEventListener("click", function () {
  this.classList.add("hide");
});

// Custom smooth scroll speed
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60, // offset for navbar height
        behavior: "smooth"
      });
    }
  });
});

// Smooth scroll to very top when logo is clicked
document.querySelector(".logo-link").addEventListener("click", function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Highlight active navbar link while scrolling
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

// Line-by-line About animation
const aboutSection = document.querySelector("#about");
const aboutLines = document.querySelectorAll(".about-text p");
let aboutPlayed = false;

function animateAboutLines() {
  const sectionTop = aboutSection.getBoundingClientRect().top;
  const triggerBottom = window.innerHeight * 0.8;

  if (sectionTop < triggerBottom && !aboutPlayed) {
    aboutLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("show");
      }, index * 250); // stagger effect (250ms between lines)
    });
    aboutPlayed = true; // only run once
  }
}

window.addEventListener("scroll", animateAboutLines);


