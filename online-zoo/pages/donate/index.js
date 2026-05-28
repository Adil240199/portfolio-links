let textAnimal = document.querySelectorAll(".circle_indicator");
let animal = document.querySelectorAll(".figure");
let hText = document.querySelectorAll(".circle_indicatorBig");
let dollar = document.querySelectorAll(".dollar");

animal.forEach((item, index) => {
  item.addEventListener("mouseover", () => {
    textAnimal[index].classList.add("hovered");
    hText[index].classList.add("hovered");
    dollar[index].classList.add("hovered");
  });

  item.addEventListener("mouseout", () => {
    textAnimal[index].classList.remove("hovered");
    hText[index].classList.remove("hovered");
    dollar[index].classList.remove("hovered");
  });
});


let burger = document.querySelector('.menu_burger')
let navTablet = document.querySelector('.nav_tablet')
function openTabletMenu() {
  navTablet.classList.add("open");
  burger.setAttribute("aria-expanded", "true");
}

function closeTabletMenu() {
  navTablet.classList.remove("open");
  navTablet.classList.add("navTablet");
  burger.setAttribute("aria-expanded", "false");
}

burger.addEventListener("click", function open() {
  openTabletMenu();
});
burger.addEventListener("keydown", function openWithKeyboard(event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openTabletMenu();
  }
  if (event.key === "Escape") {
    closeTabletMenu();
  }
});

navTablet.addEventListener("mouseout", function close() {
   closeTabletMenu();
});