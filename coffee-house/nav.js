const burger = document.querySelector(".burgerButton");
const menu = document.querySelector(".adaptivMenu");
const mobileQuery = window.matchMedia("(max-width: 768px)");

function setMenu(open) {
  menu.classList.toggle("menuAdaptivActive", open);
  burger.classList.toggle("burgerButtonActive", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menuOpen", open);
}

burger.addEventListener("click", () => {
  setMenu(!menu.classList.contains("menuAdaptivActive"));
});

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

mobileQuery.addEventListener("change", () => setMenu(false));
