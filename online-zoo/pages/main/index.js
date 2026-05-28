const animals = document.querySelectorAll(".animal");
const animalLabels = document.querySelectorAll(".text_animal");
const animalTitles = document.querySelectorAll(".h6_text");
const smallAnimals = document.querySelectorAll(".animal_small");
const burger = document.querySelector(".menu_burger");
const navTablet = document.querySelector(".nav_tablet");

function toggleHoverByIndex(index, shouldHover) {
  [animalLabels[index], animalTitles[index]].forEach((node) => {
    if (node) {
      node.classList.toggle("hovered", shouldHover);
    }
  });
}

function bindHoverGroup(nodes) {
  nodes.forEach((node, index) => {
    node.addEventListener("mouseover", () => toggleHoverByIndex(index, true));
    node.addEventListener("mouseout", () => toggleHoverByIndex(index, false));
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

bindHoverGroup(animals);
bindHoverGroup(smallAnimals);
setupBurgerMenu();