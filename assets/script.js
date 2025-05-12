const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

//Create nav active classes based on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const header = document.getElementById("site-header");
  const headerHeight = header.offsetHeight;

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
