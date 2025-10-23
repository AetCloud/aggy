import { pageHome, pageToS, pageCommissions } from "./pages.js";

document.addEventListener("DOMContentLoaded", () => {
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
  setProfilePic();

  if (profileImg) {
    profileImg.style.cursor = "pointer";
    profileImg.title = "Click to cycle profile picture";
    profileImg.addEventListener("click", () => {
      chosenIndex = (chosenIndex + 1) % profilePics.length;
      setProfilePic();
    });
  }

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

  const pageContainer = document.getElementById("page-container");
  const allNavLinks = document.querySelectorAll(".nav-link, .quick-nav-link");

  function loadPage(pageName) {
    window.scrollTo({ top: 0, behavior: "smooth" });

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
        pageContainer.innerHTML = pageHome;
    }
    setTimeout(initFadeInObserver, 50);
  }

  function handleNavClick(e) {
    e.preventDefault();
    const targetPageName = e.currentTarget.getAttribute("href").substring(1);

    loadPage(targetPageName);

    const targetHref = `[href="#${targetPageName}"]`;
    allNavLinks.forEach((link) => link.classList.remove("active"));
    document
      .querySelectorAll(`.nav-link${targetHref}, .quick-nav-link${targetHref}`)
      .forEach((link) => link.classList.add("active"));

    localStorage.setItem("aggyActiveTab", targetPageName);
  }

  allNavLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick);
  });

  const savedTab = localStorage.getItem("aggyActiveTab") || "home";

  loadPage(savedTab);

  const activeHref = `[href="#${savedTab}"]`;
  document
    .querySelectorAll(`.nav-link${activeHref}, .quick-nav-link${activeHref}`)
    .forEach((link) => link.classList.add("active"));

  initFadeInObserver();

  const quickNav = document.getElementById("quick-nav-popup");
  if (quickNav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        quickNav.classList.add("visible");
      } else {
        quickNav.classList.remove("visible");
      }
    });
  }
});
