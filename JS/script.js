window.addEventListener("scroll", function () {
  const homeSection = document.querySelector(".home");
  const homeRect = homeSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let blurValue = 0;

  if (homeRect.top < 0) {
    // Scrolling down through home section
    const scrollProgress = Math.min(
      Math.abs(homeRect.top) / homeRect.height,
      1
    );
    blurValue = 10 + 20 * scrollProgress;
  } else if (homeRect.top >= 0 && homeRect.bottom > 0) {
    // Home section is at the top of the viewport
    blurValue = 0;
  }

  homeSection.style.setProperty("--home-blur", `${blurValue}px`);
});
