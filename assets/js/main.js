const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("site-header");
const headerHeight = header.offsetHeight;

//   get current year for footer
document.getElementById("year").textContent = new Date().getFullYear();

//  sticky header offset
document.addEventListener("DOMContentLoaded", () => {
  const anchorTargets = document.querySelectorAll("section[id]");

  anchorTargets.forEach((target) => {
    target.style.scrollMarginTop = `${headerHeight}px`;
  });
});

// toggle mobile nav
const toggleBtn = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

toggleBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("active");
  });
});

function setNavTop() {
  const headerHeight = header.offsetHeight;
  mainNav.style.top = `${headerHeight}px`;
}

// Run once on load
window.addEventListener("DOMContentLoaded", setNavTop);

// Update on resize (in case header height changes)
window.addEventListener("resize", setNavTop);
