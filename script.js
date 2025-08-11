// Mobile menu toggle
document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
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
