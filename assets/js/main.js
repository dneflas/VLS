const sections = document.querySelectorAll("section");
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
