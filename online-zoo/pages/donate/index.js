const donateIndicators = document.querySelectorAll(".circle_indicator");
const donateFigures = document.querySelectorAll(".figure");
const donateBigIndicators = document.querySelectorAll(".circle_indicatorBig");
const donateAmounts = document.querySelectorAll(".dollar");
const burger = document.querySelector(".menu_burger");
const navTablet = document.querySelector(".nav_tablet");

function toggleDonateHoverByIndex(index, shouldHover) {
  [donateIndicators[index], donateBigIndicators[index], donateAmounts[index]].forEach((node) => {
    if (node) {
      node.classList.toggle("hovered", shouldHover);
    }
  });
}

function bindDonateHover() {
  donateFigures.forEach((figure, index) => {
    figure.addEventListener("mouseover", () => toggleDonateHoverByIndex(index, true));
    figure.addEventListener("mouseout", () => toggleDonateHoverByIndex(index, false));
  });
}

function setupBurgerMenu() {
  if (!burger || !navTablet) return;

  const openTabletMenu = () => {
    navTablet.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
  };

  const closeTabletMenu = () => {
    navTablet.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  };

  burger.addEventListener("click", openTabletMenu);
  burger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openTabletMenu();
    } else if (event.key === "Escape") {
      closeTabletMenu();
    }
  });

  navTablet.addEventListener("mouseout", closeTabletMenu);
}

bindDonateHover();
setupBurgerMenu();