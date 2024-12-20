////////// DOM ELEMENTS //////////
const openMenuButton = document.querySelector(".open-menu-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const navbar = document.querySelector(".navbar");
const links = document.querySelectorAll(".navbar a")
const overlay = document.querySelector(".overlay");
const scrollToTopLink = document.querySelector(".scroll-to-top-link");
const sections = document.querySelectorAll('section')


////////// MENU //////////
openMenuButton.addEventListener("click", () => {
  navbar.classList.add("active");
  overlay.classList.add("active");
  openMenuButton.setAttribute("aria-expanded", "true");
})

closeMenuButton.addEventListener("click", () => {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  openMenuButton.setAttribute("aria-expanded", "false");
})

overlay.addEventListener("click", () => {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  openMenuButton.setAttribute("aria-expanded", "false");
})

links.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    openMenuButton.setAttribute("aria-expanded", "false");
  })
})

window.addEventListener("scroll", () => {
  navbar.classList.remove('active');
  overlay.classList.remove("active");
  openMenuButton.setAttribute("aria-expanded", "false");
})


////////// SCROLL TO TOP LINK //////////
window.addEventListener("scroll", function () {
  scrollToTopLink.classList.toggle("active", window.scrollY > 500);
});

scrollToTopLink.addEventListener("click", (event) => {
  event.preventDefault();

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})


////////// ACTIVE LINK WITH SCROLL //////////
function activeLinks() {
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) { }
  links.forEach(link => link.classList.remove("active"));
  links[len].classList.add("active");
}

activeLinks();
window.addEventListener("scroll", activeLinks);


////////// SCROLL TO SECTION //////////
links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const sectionId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


//////// THEME ////////// 
const themeButton = document.querySelector(".theme-button");
const body = document.body;
const darkTheme = "dark-theme";
const sunIcon = "ri-sun-fill";
const moonIcon = "ri-moon-fill";
const sound = new Audio("assets/audio/sonido.mp3");

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  body.classList.contains(darkTheme) ? "dark" : "light";

const getCurrentIcon = () =>
  themeButton.querySelector('i').classList.contains(sunIcon) ? "sun" : "moon";

if (selectedTheme) {
  body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);

  if (selectedTheme === "dark") {
    themeButton.querySelector('i').classList.add(moonIcon);
    themeButton.querySelector('i').classList.remove(sunIcon);
  } else {
    themeButton.querySelector('i').classList.add(sunIcon);
    themeButton.querySelector('i').classList.remove(moonIcon);
  }
} else {
  body.classList.remove(darkTheme);
  themeButton.querySelector('i').classList.add(sunIcon);
}

themeButton.addEventListener("click", () => {
  body.classList.toggle(darkTheme);

  if (body.classList.contains(darkTheme)) {
    themeButton.querySelector('i').classList.remove(sunIcon);
    themeButton.querySelector('i').classList.add(moonIcon);
  } else {
    themeButton.querySelector('i').classList.remove(moonIcon);
    themeButton.querySelector('i').classList.add(sunIcon);
  }

  sound.play();

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});