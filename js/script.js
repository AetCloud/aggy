// profile picture handling + fade-in observer
document.addEventListener("DOMContentLoaded", () => {
  // profile pictures (assets/img)
  const profilePics = [
    "assets/img/pfp.png",
    "assets/img/pfp2.png",
    "assets/img/pfp3.png",
  ];

  // default index (change to 1 or 2 to default to another image)
  let chosenIndex = 0;

  // uncomment to randomize on each page load:
  // chosenIndex = Math.floor(Math.random() * profilePics.length);

  const profileImg = document.getElementById("profile-pic");
  function setProfilePic() {
    if (!profileImg) return;
    profileImg.src = profilePics[chosenIndex % profilePics.length];
  }
  setProfilePic();

  // click profile to cycle through pics
  if (profileImg) {
    profileImg.style.cursor = "pointer";
    profileImg.title = "Click to cycle profile picture";
    profileImg.addEventListener("click", () => {
      chosenIndex = (chosenIndex + 1) % profilePics.length;
      setProfilePic();
    });
  }

  // fade-in IntersectionObserver (animates once)
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
});
