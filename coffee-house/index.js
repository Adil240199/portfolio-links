const sliders = document.querySelector(".sliders");
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slider");
const [btnPrev, btnNext] = document.querySelectorAll(".arrow");
const indicators = document.querySelectorAll(".indicator .line");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const autoplayDelay = 5000;

let currentIndex = 0;
let startX = 0;
let deltaX = 0;
let isDragging = false;
let autoplayTimer;

function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  carousel.style.transition = "transform 0.4s ease";
  carousel.style.transform = `translateX(-${sliders.clientWidth * currentIndex}px)`;
  indicators.forEach((line, i) =>
    line.classList.toggle("lineActive", i === currentIndex)
  );
  restartAutoplay();
}

function restartAutoplay() {
  clearTimeout(autoplayTimer);
  if (reducedMotion.matches) return;
  autoplayTimer = setTimeout(() => goToSlide(currentIndex + 1), autoplayDelay);
}

function dragStart(event) {
  isDragging = true;
  startX = event.clientX;
  deltaX = 0;
  carousel.style.transition = "none";
  clearTimeout(autoplayTimer);
  sliders.setPointerCapture(event.pointerId);
}

function dragMove(event) {
  if (!isDragging) return;
  deltaX = event.clientX - startX;
  carousel.style.transform = `translateX(${deltaX - sliders.clientWidth * currentIndex}px)`;
}

function dragEnd() {
  if (!isDragging) return;
  isDragging = false;
  const threshold = sliders.clientWidth / 4;
  if (deltaX < -threshold) goToSlide(currentIndex + 1);
  else if (deltaX > threshold) goToSlide(currentIndex - 1);
  else goToSlide(currentIndex);
}

btnPrev.addEventListener("click", () => goToSlide(currentIndex - 1));
btnNext.addEventListener("click", () => goToSlide(currentIndex + 1));
sliders.addEventListener("pointerdown", dragStart);
sliders.addEventListener("pointermove", dragMove);
sliders.addEventListener("pointerup", dragEnd);
sliders.addEventListener("pointercancel", dragEnd);
window.addEventListener("resize", () => {
  carousel.style.transition = "none";
  carousel.style.transform = `translateX(-${sliders.clientWidth * currentIndex}px)`;
});

goToSlide(0);
