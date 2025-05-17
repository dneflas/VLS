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

//   review carousel
const reviews = [
  {
    text: "It was a pleasure to work with  Vera Language Services! Their  team took the time for the language detail, especially as it relates to cultural differences.  They remained responsive and circled back with me when needed, allowing the project to be completed on time – we could not have been happier to partner with such professionals!",
    author: "– Drew Child Development Corp.",
    logo: "./assets/images/clients/drew.png",
  },
  { text: "Highly professional and reliable.", author: "– Jordan M." },
  { text: "Excellent translators, quick turnaround!", author: "– Casey L." },
];

let index = 0;

const reviewText = document.getElementById("review-text");
const reviewAuthor = document.getElementById("review-author");
const dotsContainer = document.getElementById("dots-container");

function renderDots() {
  dotsContainer.innerHTML = "";
  reviews.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === index) dot.classList.add("active");
    dot.addEventListener("click", () => {
      index = i;
      showReview(index);
    });
    dotsContainer.appendChild(dot);
  });
}

const reviewLogo = document.getElementById("review-logo");

function showReview(i) {
  reviewText.textContent = `"${reviews[i].text}"`;
  reviewAuthor.textContent = reviews[i].author;
  reviewLogo.src = reviews[i].logo;
  renderDots();
}

// Initialize
showReview(index);
