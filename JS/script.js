window.addEventListener("scroll", function () {
  const homeSection = document.querySelector(".home");
  if (!homeSection) return; // guard

  const homeRect = homeSection.getBoundingClientRect();

  const MIN_BLUR = 10; // keep the background blurred when home is visible
  let blurValue = MIN_BLUR;

  if (homeRect.top < 0) {
    // Scrolling down through home section -> increase blur
    const scrollProgress = Math.min(
      Math.abs(homeRect.top) / homeRect.height,
      1
    );
    blurValue = MIN_BLUR + 20 * scrollProgress;
  } else if (homeRect.top >= 0 && homeRect.bottom > 0) {
    // Home is visible at top of viewport -> keep minimum blur (don't go to 0)
    blurValue = MIN_BLUR;
  } else {
    // Off-screen above or below -> keep minimum blur as fallback
    blurValue = MIN_BLUR;
  }

  homeSection.style.setProperty("--home-blur", `${blurValue}px`);
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".Hamburger");
  const navbar = document.querySelector(".navbar");
  if (!hamburger || !navbar) return;

  // accessibility helpers
  hamburger.setAttribute("tabindex", "0");
  hamburger.setAttribute("role", "button");
  hamburger.setAttribute("aria-label", "Toggle navigation");

  const setAria = () => {
    const hidden = navbar.classList.contains("nav-hide");
    hamburger.setAttribute("aria-pressed", String(!hidden));
    navbar.setAttribute("aria-hidden", String(hidden));
  };
  setAria();

  const toggleNav = () => {
    navbar.classList.toggle("nav-hide");
    setAria();
  };

  hamburger.addEventListener("click", toggleNav);
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      toggleNav();
    }
  });

  // optional: close nav on Escape or click outside
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !navbar.classList.contains("nav-hide")) {
      navbar.classList.add("nav-hide");
      setAria();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !navbar.classList.contains("nav-hide") &&
      !navbar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navbar.classList.add("nav-hide");
      setAria();
    }
  });
});
