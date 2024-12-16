document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  const navLinks = document.querySelectorAll(".nav-link");

  const loadPage = async (page) => {
    try {
      const response = await fetch(`pages/${page}.html`);
      if (!response.ok) throw new Error("Page not found");
      const content = await response.text();
      mainContent.innerHTML = content;
      setActiveNavLink(page);
    } catch (error) {
      mainContent.innerHTML = `<div class="text-center"><h1>Error</h1><p>${error.message}</p></div>`;
    }
  };

  loadPage("home");

  const setActiveNavLink = (page) => {
    navLinks.forEach((link) => {
      link.classList.remove("text-primary");
    });

    const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
    if (activeLink) {
      activeLink.classList.add("text-primary");
    }
  };

  const handleNavLinkClick = (e) => {
    e.preventDefault();
    const page = e.target.getAttribute("data-page");
    loadPage(page);
    history.pushState({ page }, "", e.target.href);
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });

  window.addEventListener("popstate", (e) => {
    const page = e.state?.page || "home";
    loadPage(page);
  });

  const button = document.getElementById("getQuote");
  button.addEventListener("click", () => {
    console.log("Button clicked!");
    // loadPage("contact");
    history.pushState({ page: "contact" }, "/contact");
  });
});

let lastScrollY = window.scrollY;
const topHeader = document.getElementById("top-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    topHeader.classList.remove("visible");
    topHeader.classList.add("hidden");
  } else {
    topHeader.classList.remove("hidden");
    topHeader.classList.add("visible");
  }
  lastScrollY = window.scrollY;
});

const searchToggle = document.getElementById("search-toggle");
const searchBox = document.getElementById("search-box");
searchToggle.addEventListener("click", () => {
  searchBox.classList.toggle("hidden");
});