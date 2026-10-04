const root = document.documentElement;
const loader = document.querySelector(".loader");
const particleField = document.querySelector(".scene__particles");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loader.classList.add("is-hidden");
  }, 650);
});

if (!reduceMotion) {
  for (let i = 0; i < 34; i += 1) {
    const particle = document.createElement("i");
    particle.className = "particle";
    particle.style.setProperty("--x", `${Math.random() * 100}%`);
    particle.style.setProperty("--size", `${0.6 + Math.random() * 1.7}px`);
    particle.style.setProperty("--duration", `${9 + Math.random() * 20}s`);
    particle.style.setProperty("--delay", `${-Math.random() * 25}s`);
    particle.style.setProperty("--drift", `${-35 + Math.random() * 70}px`);
    particle.style.setProperty("--opacity", `${0.2 + Math.random() * 0.55}`);
    particleField.appendChild(particle);
  }

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener("pointermove", (event) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    root.style.setProperty("--cursor-x", `${event.clientX}px`);
    root.style.setProperty("--cursor-y", `${event.clientY}px`);
  });

  const updateParallax = () => {
    currentX += (targetX - currentX) * 0.045;
    currentY += (targetY - currentY) * 0.045;
    root.style.setProperty("--mx", currentX.toFixed(3));
    root.style.setProperty("--my", currentY.toFixed(3));
    window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
}
