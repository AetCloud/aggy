// Import page content from pages.js
import { pageHome, pageToS, pageCommissions } from "./pages.js";

document.addEventListener("DOMContentLoaded", () => {
  // === Profile Picture Cycling (Static Header) ===
  const profilePics = [
    "assets/img/pfp.png",
    "assets/img/pfp2.png",
    "assets/img/pfp3.png",
  ];
  let chosenIndex = 0;
  const profileImg = document.getElementById("profile-pic");

  function setProfilePic() {
    if (!profileImg) return;
    profileImg.src = profilePics[chosenIndex % profilePics.length];
  }
  setProfilePic(); // Set initial picture

  if (profileImg) {
    profileImg.style.cursor = "pointer";
    profileImg.title = "Click to cycle profile picture";
    profileImg.addEventListener("click", () => {
      chosenIndex = (chosenIndex + 1) % profilePics.length;
      setProfilePic();
    });
  }

  // === Fade-in IntersectionObserver (Reusable Function) ===
  function initFadeInObserver() {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  }

  // === Page (Tab) Switching & Content Loading ===
  const pageContainer = document.getElementById("page-container");
  const allNavLinks = document.querySelectorAll(".nav-link, .quick-nav-link");

  // Function to load page content into the container
  function loadPage(pageName) {
    // Added smooth scroll
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Inject the correct HTML string
    switch (pageName) {
      case "home":
        pageContainer.innerHTML = pageHome;
        break;
      case "tos":
        pageContainer.innerHTML = pageToS;
        break;
      case "commissions":
        pageContainer.innerHTML = pageCommissions;
        break;
      default:
        pageContainer.innerHTML = pageHome; // Default to home
    }
    // Re-initialize the fade-in observer for the new content
    setTimeout(initFadeInObserver, 50);
  }

  // This function handles a click on ANY nav link (main or quick-nav)
  function handleNavClick(e) {
    e.preventDefault(); // Stop browser from jumping to hash
    const targetPageName = e.currentTarget.getAttribute("href").substring(1); // "home", "tos", etc.

    // Load the new page content
    loadPage(targetPageName);

    // Update active state on ALL nav systems
    const targetHref = `[href="#${targetPageName}"]`;
    allNavLinks.forEach((link) => link.classList.remove("active"));
    document
      .querySelectorAll(`.nav-link${targetHref}, .quick-nav-link${targetHref}`)
      .forEach((link) => link.classList.add("active"));

    // Save the new active tab to localStorage
    localStorage.setItem("aggyActiveTab", targetPageName);
  }

  // Apply the unified click handler to all nav links
  allNavLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick);
  });

  // --- Initial Page Load ---
  // Check localStorage for a saved tab, otherwise default to 'home'
  const savedTab = localStorage.getItem("aggyActiveTab") || "home";

  // Load the saved or default page
  loadPage(savedTab);

  // Set the correct nav link to 'active' on ALL nav systems
  const activeHref = `[href="#${savedTab}"]`;
  document
    .querySelectorAll(`.nav-link${activeHref}, .quick-nav-link${activeHref}`)
    .forEach((link) => link.classList.add("active"));

  // Run the observer for the main static elements (card, header, etc.)
  initFadeInObserver();

  // === Quick Nav Popup Scroll Listener ===
  const quickNav = document.getElementById("quick-nav-popup");
  if (quickNav) {
    window.addEventListener("scroll", () => {
      // Show button if scrolled more than 300px
      if (window.scrollY > 300) {
        quickNav.classList.add("visible");
      } else {
        quickNav.classList.remove("visible");
      }
    });
  }
});
