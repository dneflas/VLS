//  create nav active classes based on scroll
window.addEventListener("scroll", () => {
  let current = "";

  console.log("height", headerHeight);

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 1;
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
  {
    text: "Vera Language Services has provided our firm written translation of training programs, live training presentation, as well as interview interpreting. They are responsive, easy to work with and always deliver quickly and on time. A wonderful resource. ",
    author: "– Progressive Management Resources, Inc.",
    logo: "./assets/images/clients/pmr.png",
  },
  {
    text: "Our office has used Vera Language Services many times for translations of legal documents in Spanish and Japanese, interpreting during in person meetings, as well as communications with clients in other countries.  They offer comprehensive and efficient translation and interpreting services. Not to mention they are very friendly, attentive to each project, and they provide fast turnaround time. There is no need to look elsewhere when it comes to translation needs!",
    author: "– Law Offices of Phillip L. Tangalakis",
    logo: "./assets/images/clients/logo-placeholder.png",
  },
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

showReview(index);
