const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("site-header");
const headerHeight = header.offsetHeight;

//   get current year for footer
document.getElementById("year").textContent = new Date().getFullYear();

//Create nav active classes based on scroll
window.addEventListener("scroll", () => {
  let current = "";

  console.log("height", headerHeight);

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// sticky header offset
document.addEventListener("DOMContentLoaded", () => {
  const anchorTargets = document.querySelectorAll("section[id]");

  anchorTargets.forEach((target) => {
    target.style.scrollMarginTop = `${headerHeight}px`;
  });
});

// slide in on scroll animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    }
  });
});

document
  .querySelectorAll(".slide-animation")
  .forEach((el) => observer.observe(el));
